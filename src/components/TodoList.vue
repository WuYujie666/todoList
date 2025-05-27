<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import TodoForm from './TodoForm.vue'
import FilterButton from './FilterButton.vue'
import SearchBox from './SearchBox.vue'
import { computed, ref } from 'vue'
import { useTodo } from '@/stores/todo.ts' // Import the Pinia store
import { useDate } from '@/composables/useDate'
import type { Item } from '@/types'
import { RouterLink } from 'vue-router'
import draggable from 'vuedraggable'

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
                            <td>
                                <input type="checkbox" v-model="item.completed" />
                                <button @click="todoStore.deleteItem(item.id)">删除</button>
                                <RouterLink
                                    :to="{
                                        path: '/detail',
                                        query: { id: item.id },
                                    }"
                                >
                                    <button>详情</button>
                                </RouterLink>
                            </td>
                        </TodoItem>
                    </template>
                </draggable>
            </table>
        </div>
        <RouterView />
    </div>
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
</style>
