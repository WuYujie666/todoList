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
let isDisplay = ref(true)
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
    <main>
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
        <ul>
            <TodoItem
                v-for="(item, id) in filteredTodos"
                :key="id"
                v-bind="item"
                v-on:toggleCompleted="
                    () => (getTodoById(id).completed = !getTodoById(id).completed)
                "
                v-on:deleteItem="
                    () => todoList.splice(id, 1) //这个地方就是不能.value
                "
            />
            <!--  切换真假 是=!，不是!= -->
            <!-- <li v-for="(item, index) in todoList" :key="index">{{ item }}</li> -->
        </ul>
        <FilterButton v-model:isDisplay="isDisplay" />
    </main>
</template>

<style scoped></style>
