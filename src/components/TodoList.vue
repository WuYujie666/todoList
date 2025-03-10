<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import TodoForm from './TodoForm.vue'
import FilterButton from './FilterButton.vue'
import { computed, ref } from 'vue'
let id = 0
const todoList = ref<TodoItem[]>([
    { id: id++, content: '任务 1', completed: false },
    { id: id++, content: '任务 2', completed: false },
    { id: id++, content: '任务 3', completed: false },
])
let isDisplay = ref(false)
const filteredTodos = computed(() => {
    return isDisplay.value
        ? todoList.value.filter((item: TodoItem) => !item.completed)
        : todoList.value
})
function getTodoById(id: number): TodoItem {
    return todoList.value.find((item: TodoItem) => item.id === id)
}
// const incompletedList = computed(
//     () => <TodoItem[]>todoList.value.filter((item: TodoItem) => item.completed == false),
// )
// const completedList = computed(
//     () => <TodoItem[]>todoList.value.filter((item: TodoItem) => item.completed == true),
// )
//const filteredTodoList=computed(()=>{})
// const todoList = ref<TodoItem[]>([])
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
                <TodoItem
                    v-for="(item, id) in filteredTodos"
                    :key="id"
                    v-bind="item"
                    v-on:toggleCompleted="
                        () => {
                            let i = getTodoById(id)
                            i.completed = !i.completed
                        }
                    "
                    v-on:deleteItem="
                        () => todoList.splice(id, 1) //这个地方就是不能.value
                    "
                />
                <!--  切换真假 是=!，不是!= -->
                <!-- <li v-for="(item, index) in todoList" :key="index">{{ item }}</li> -->
            </ul>
        </div>
    </div>
</template>

<style scoped>
.background {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 97.8vh; /*为什么*/
    background-color: #2d1b69; /* 背景颜色 */
    border-radius: 10px;
}

.bigContainer {
    outline: #6c6096 solid 1px;
    border-radius: 10px;
    height: 50%;
    width: 50%;
    padding: 0px;
    background-color: #4c3d7f;
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
    padding: 0px;
    margin: 0px;
}
</style>
