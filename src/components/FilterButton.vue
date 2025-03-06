<template>
    <button @click="() => (isDisplay = !isDisplay)">{{ displayComplete }}</button>
</template>
<script setup>
import { ref, computed } from 'vue'
let isDisplay = ref(false)
let displayComplete = computed(() => {
    return isDisplay.value ? '隐藏已完成' : '显示已完成'
})
</script>
