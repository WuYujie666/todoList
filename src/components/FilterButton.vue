<template>
    <button @click="() => (isDisplay = !isDisplay)">{{ displayComplete }}</button>
</template>
<script setup>
import { ref, computed } from 'vue'
let isDisplay = defineModel()
let displayComplete = computed(() => {
    return isDisplay.value ? '显示全部' : '隐藏已完成任务' //逻辑不复杂，应该直接写进template
})
</script>
<style scoped>
button {
    width: 50px;
    height: 44px;
    margin: 0 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
}
</style>
