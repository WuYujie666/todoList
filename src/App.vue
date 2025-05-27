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
    font-weight: normal;
    font-size: 14px;
}
button {
    background-color: var(--second-color);
    cursor: pointer;
    border-radius: 5px;
    border-color: var(--second-color);
}
:root {
    --main-color: #2d1b69;
    --lighter-main-color: #4c3d7f;
    --darker-main-color: #1d0d3b;
    --second-color: #3dbdf0;
    --text-color: #ffffff;
}
@media screen and (max-width: 768px) {
    td,
    th {
        text-align: left;
        padding: 0px 10px;
        height: 30px;
    }
}
td,
th {
    text-align: left;
    padding: 0px 10px;
    height: 30px;
}
</style>
