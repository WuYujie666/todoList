<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import { ref } from 'vue'
const todoList = ref([{ content: '任务 1' }, { content: '任务 2' }, { content: '任务 3' }])
</script>

<template>
  <main>
    <ul>
      <TodoItem v-for="(item, index) in todoList" :key="index" v-bind="item" />
      <!-- <li v-for="(item, index) in todoList" :key="index">{{ item }}</li> -->
    </ul>
  </main>
</template>

<style scoped></style>
