<script setup lang="ts">
import Todolist from './components/TodoList.vue'
import TodoForm from './components/TodoForm.vue'
</script>

<template>
    <header><h1>TodoList</h1></header>

    <main>
        <TodoForm />
        <Todolist />
    </main>
</template>

<style scoped></style>
