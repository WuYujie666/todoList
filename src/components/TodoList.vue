<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import TodoForm from './TodoForm.vue'
import FilterButton from './FilterButton.vue'
import SearchBox from './SearchBox.vue'
import { computed, ref } from 'vue'
import { useTodo } from '@/stores/todo.ts' // Import the Pinia store
import type { Item } from '@/types'

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
                (item.note && item.note.toLowerCase().includes(query)),
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
                <tbody>
                    <TodoItem
                        v-for="item in filteredTodos"
                        :key="item.id"
                        :item="item"
                        v-on:deleteItem="(itemId) => todoStore.deleteItem(itemId)"
                    />
                </tbody>
            </table>
        </div>
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
    padding: 0px;
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
    margin-left: auto;
    margin-right: auto;
    margin-top: 2%;
    margin-bottom: 3%;
    background-color: var(--main-color);
    border-radius: 10px;
    width: 88%;
    height: 100%;
    overflow: hidden;
}

table tr:nth-child(odd) {
    background-color: var(--main-color);
}

table tr:nth-child(even) {
    background-color: var(--darker-main-color);
}

table thead tr th {
    padding: 5px 0px;
    background-color: var(--darker-main-color);
    border-radius: 10px 10px 0px 0px;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
    .bigContainer {
        width: 95%;
        margin: 5px 0;
    }

    h1 {
        font-size: 24px;
    }

    table {
        width: 95%;
        font-size: 14px;
    }

    table thead tr th {
        padding: 3px 0px;
    }
}
</style>
