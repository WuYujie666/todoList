<script setup lang="ts">
import Todolist from './components/TodoList.vue'
</script>

<template>
    <header></header>
    <main>
        <Todolist />
    </main>
</template>

<style>
* {
    color: #ffffff;
    font-family: '微软雅黑', '黑体', Arial;
}
button {
    margin: auto 7px;
    background-color: var(--second-color);
    cursor: pointer;
    border-radius: 5px;
    border-color: var(--second-color);
}
</style>
