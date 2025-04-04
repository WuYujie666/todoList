<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import TodoForm from './TodoForm.vue'
import FilterButton from './FilterButton.vue'
import { computed, ref } from 'vue'
import { type Item } from '@/types'
import { useRoute } from 'vue-router'

let id = 0
const todoList = ref<Array<Item>>([
    { id: id++, content: '任务 1', completed: false },
    { id: id++, content: '任务 2', date: new Date(), completed: false, detail: '步骤1步骤2步骤3' },
    { id: id++, content: '任务 3', completed: true },
])
let isDisplay = ref(false)
const filteredTodos = computed(() => {
    return isDisplay.value ? todoList.value.filter((item: Item) => !item.completed) : todoList.value
})
function getIndexById(idToFind: number): number {
    return todoList.value.findIndex((element) => element.id === idToFind)
}
</script>

<template>
    <div class="background text">
        <div class="bigContainer">
            <h1>Todo List</h1>
            <!-- 太神奇了写header里就不行 -->
            <TodoForm v-on:addItem="(newItem: Item) => todoList.push(newItem)" />
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
                        v-on:deleteItem="
                            (itemId) => {
                                todoList.splice(getIndexById(itemId), 1)
                            } //这个地方就是不能.value
                        "
                    />
                    <!--  切换真假 是=!，不是!= -->
                    <!-- <li v-for="(item, index) in todoList" :key="index">{{ item }}</li> -->
                    <!-- :item="item"，之前这里少了一个item -->
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
    padding: 5px, 0px;
    background-color: var(--darker-main-color);
    border-radius: 10px, 10px, 0px, 0px;
    /* 圆角失效 */
}
</style>
