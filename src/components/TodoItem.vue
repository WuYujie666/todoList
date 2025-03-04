<template>
  <li>{{ item.content }}</li>
</template>
<script setup>
const item = defineProps({
  //为什么大写？
  content: String,
  completed: Boolean,
})
</script>
