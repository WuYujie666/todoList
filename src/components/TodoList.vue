<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import { ref } from 'vue'
const todoList = ref([
    { content: '任务 1', completed: false },
    { content: '任务 2', completed: false },
    { content: '任务 3', completed: false },
])
</script>

<template>
    <main>
        <ul>
            <TodoItem
                v-for="(item, index) in todoList"
                :key="index"
                v-bind="item"
                v-on:toggleCompleted="() => (item.completed = !item.completed)"
            />
            <!-- <li v-for="(item, index) in todoList" :key="index">{{ item }}</li> -->
        </ul>
    </main>
</template>

<style scoped></style>
