<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import TodoForm from './TodoForm.vue'
import FilterButton from './FilterButton.vue'
import SearchBox from './SearchBox.vue'
import { computed, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useTodo } from '@/stores/todo.ts' // Import the Pinia store
import { useDate } from '@/composables/useDate'
import type { Item } from '@/types'
import draggable from 'vuedraggable'
import { computePosition, offset, flip, shift, arrow } from '@floating-ui/dom'

const isDisplay = ref<boolean>(true)
const searchQuery = ref('')
const todoStore = useTodo() // Use the store

const filteredTodos = computed(() => {
    let filtered = isDisplay.value
        ? todoStore.todoList
        : todoStore.todoList.filter((item: Item) => !item.completed)

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(
            (item: Item) =>
                item.title.toLowerCase().includes(query) ||
                (item.detail && item.detail.toLowerCase().includes(query)),
        )
    }

    return filtered
})

const handleSearch = (query: string) => {
    searchQuery.value = query
}

const handleClearSearch = () => {
    searchQuery.value = ''
}

// floating-ui 相关逻辑
const referenceRef = ref<HTMLElement | null>(null)
const floatingRef = ref<HTMLElement | null>(null)
const isDetailVisible = ref(false)
const selectedItem = ref<Item | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

function showDetail(refEl: HTMLElement, item: Item) {
    referenceRef.value = refEl
    selectedItem.value = item
    isDetailVisible.value = true
}
watch([floatingRef], async ([popup]) => {
    if (isDetailVisible.value && referenceRef.value && popup) {
        await nextTick()
        computePosition(referenceRef.value!, popup, {
            placement: 'right',
            middleware: [offset(8), flip(), shift(), arrow({ element: arrowRef.value! })], //!断言不是null
        }).then(({ x, y, placement, middlewareData }) => {
            Object.assign(popup.style, {
                left: `${x}px`,
                top: `${y}px`,
            })
            // 设置箭头位置
            // Accessing the data
            const arrowData = middlewareData.arrow
            if (!arrowData) return

            const { x: arrowX, y: arrowY } = arrowData
            // 动态获取 staticSide
            const staticSide = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right',
            }[placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left']

            // 先重置所有方向
            Object.assign(arrowRef.value!.style, {
                left: arrowX != null ? `${arrowX}px` : '',
                top: arrowY != null ? `${arrowY}px` : '',
                right: '',
                bottom: '',
            })
            // 再设置 staticSide
            if (['top', 'right', 'bottom', 'left'].includes(staticSide)) {
                arrowRef.value!.style[staticSide as 'top' | 'right' | 'bottom' | 'left'] = '-4px'
            }
        })
    }
})

function closeDetail() {
    isDetailVisible.value = false
}

function handleClickOutside(event: MouseEvent) {
    if (
        isDetailVisible.value &&
        floatingRef.value &&
        !floatingRef.value.contains(event.target as Node)
    ) {
        closeDetail()
    }
}

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
})
onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
    <div class="background text">
        <div class="bigContainer">
            <h1>Todo List</h1>
            <TodoForm v-on:addItem="(newItem) => todoStore.addItem(newItem)" />
            <SearchBox @search="handleSearch" @clear="handleClearSearch" />
            <FilterButton v-model="isDisplay" />
            <table>
                <thead>
                    <tr>
                        <th>任务</th>
                        <th>日期</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <!-- <li v-for="(item, index) in todoList" 这里第二个参数无论形参什么名字，实参都是index。如果你可能删除元素，那么不要用index-->
                <draggable
                    v-model="todoStore.todoList"
                    tag="tbody"
                    item-key="id"
                    :animation="200"
                    ghost-class="ghost"
                    chosen-class="chosen"
                    drag-class="drag"
                >
                    <template #item="{ element: item }">
                        <TodoItem
                            :item="item"
                            v-if="filteredTodos.some((todo) => todo.id === item.id)"
                        >
                            <td>{{ item.title }}</td>
                            <td>{{ useDate(item.date).dateString }}</td>
                            <td class="operations">
                                <input type="checkbox" v-model="item.completed" />
                                <button @click="todoStore.deleteItem(item.id)">×</button>
                                <button
                                    @click="showDetail($event.currentTarget as HTMLElement, item)"
                                >
                                    ⓘ
                                </button>
                            </td>
                        </TodoItem>
                    </template>
                </draggable>
            </table>
        </div>
    </div>
    <Teleport to="body">
        <div v-if="isDetailVisible && selectedItem" ref="floatingRef" class="task-detail-popup">
            <div ref="arrowRef" class="popup-arrow"></div>
            <div class="details">
                <textarea
                    v-model="selectedItem.detail"
                    class="detailInput"
                    placeholder="请输入详情..."
                ></textarea>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.background {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    min-height: 97vh;
    background-color: var(--main-color); /* 背景颜色 */
    border-radius: 10px;
}

.bigContainer {
    outline: #6c6096 solid 1px;
    border-radius: 10px;
    min-height: 50vh;
    max-height: 100vh;
    width: 50%;
    padding: 20px;
    background-color: #4c3d7f;
    margin: 10px 0;
}

h1 {
    margin-bottom: 10px;
    padding: 0px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
}
.operations {
    display: flex;
    justify-content: left;
    gap: 0.625rem;
    align-items: center;
}
table {
    border-radius: 10px;
    width: 88%;
    height: 100%;
    overflow: hidden;
}
.bigContainer > * {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 14px;
}
/* 表头样式 */
table thead tr {
    background-color: var(--darker-main-color);
}

/* 表体奇数偶数行 */
table tbody tr:nth-child(odd) {
    background-color: var(--main-color);
}
table tbody tr:nth-child(even) {
    background-color: var(--darker-main-color);
}

/* 拖拽时的幽灵元素样式 */
.ghost {
    opacity: 0.5;
    background-color: rgba(255, 255, 255, 0.2) !important;
}

/* 被选中准备拖拽的元素 */
.chosen {
    background-color: rgba(74, 184, 227, 0.3) !important;
}

/* 正在拖拽的元素 */
.drag {
    background-color: rgba(74, 184, 227, 0.5) !important;
    transform: rotate(2deg);
}

/* 让表格行看起来可以拖拽 */
tbody tr {
    cursor: move;
    transition: all 0.2s ease;
}

tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
}
/* 移动端适配 */
@media screen and (max-width: 768px) {
    .background {
        align-items: flex-start;
        min-height: 100vh;
        padding: 0 30px;
    }

    .bigContainer {
        width: 100%;
        margin: 0;
        outline: none;
        background-color: transparent;
    }
}

.task-detail-popup {
    z-index: 1000;
    background: transparent; /* 只做定位和阴影 */
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 0;
    position: absolute;
    overflow: visible;
}

.details {
    min-width: 15.625rem;
    max-width: 90vw;
    min-height: 7.5rem;
    max-height: 80vh;
    border-radius: 10px;
    background-color: var(--main-color);
    padding: 10px;
    box-sizing: border-box;
    margin: 0 auto;
}
.detailInput {
    width: 100%;
    min-height: 6.25rem;
    max-height: 80vh;
    font-size: 1rem;
    border-radius: 8px;
    border: none;
    background-color: var(--lighter-main-color);
    padding: 8px 12px;
    resize: vertical;
    box-sizing: border-box;
    overflow-y: auto;
    margin: 0;
    display: block;
}
@media (max-width: 600px) {
    .task-detail-popup,
    .details {
        min-width: 7rem;
        max-width: 90vw;
        min-height: 10rem;
        max-height: 60vh;
    }
    .detailInput {
        min-height: 9rem;
        max-height: 60vh;
        font-size: 0.95rem;
    }
}

.popup-arrow {
    position: absolute;
    width: 12px;
    height: 12px;
    background: var(--main-color, #fff);
    transform: rotate(45deg);
}
</style>
