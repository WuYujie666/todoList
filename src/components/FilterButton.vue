<template>
    <button @click="() => (isDisplay = !isDisplay)">{{ displayComplete }}</button>
</template>
<script setup>
import { ref, computed } from 'vue'
let isDisplay = defineModel()
let displayComplete = computed(() => {
    return isDisplay.value ? '显示' : '隐藏' //逻辑不复杂，应该直接写进template
})
</script>
<style scoped>
button {
    width: 50px;
    height: 35px;
    margin: 20px 0px 5px 40px;
}
</style>
