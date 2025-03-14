<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import TodoForm from './TodoForm.vue'
import FilterButton from './FilterButton.vue'
import { computed, ref } from 'vue'
import { type Item } from '@/types'
let id = 0
const todoList = ref<Array<Item>>([
    { id: id++, content: '任务 1', completed: false },
    { id: id++, content: '任务 2', completed: true },
    { id: id++, content: '任务 3', completed: false },
])
let isDisplay = ref(false)
const filteredTodos = computed(() => {
    return isDisplay.value ? todoList.value.filter((item: Item) => !item.completed) : todoList.value
})
function getIndexById(idToFind: number): number {
    return todoList.value.findIndex((element) => element.id === idToFind)
}
// const incompletedList = computed(
//     () => <Item[]>todoList.value.filter((item: Item) => item.completed == false),
// )
// const completedList = computed(
//     () => <Item[]>todoList.value.filter((item: Item) => item.completed == true),
// )
//const filteredTodoList=computed(()=>{})
// const todoList = ref<Item[]>([])
</script>

<template>
    <div class="background text">
        <div class="bigContainer">
            <h1>Todo List</h1>
            <!-- 太神奇了写header里就不行 -->
            <TodoForm
                v-on:addItem="
                    (newContent: string) =>
                        todoList.push({
                            content: newContent,
                            completed: false,
                            id: id++,
                        })
                "
            />
            <FilterButton v-model="isDisplay" />
            <ul>
                <!-- <li v-for="(item, index) in todoList" 这里第二个参数无论形参什么名字，实参都是index。如果你可能删除元素，那么不要用index-->
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
            </ul>
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
    margin: 20px 0;
}

h1 {
    margin-bottom: 10px;
    padding: 0px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
}
ul {
    list-style-type: none;
    padding: 20px;
    margin: 10px 40px 15px 40px;
    background-color: var(--main-color);
    border-radius: 10px;
}
li {
    margin: 10px 10px;
}
</style>
