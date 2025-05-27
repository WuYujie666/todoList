<template>
    <button @click="() => (isDisplay = !isDisplay)" title="隐藏/显示已完成任务">
        {{ displayComplete }}
    </button>
</template>
<script setup>
import { ref, computed } from 'vue'
let isDisplay = defineModel()
let displayComplete = computed(() => {
    return isDisplay.value ? '隐藏' : '显示' //逻辑不复杂，应该直接写进template
})
</script>
<style scoped>
button {
    width: auto !important;
    min-width: 50px;
    max-width: 120px;
}
</style>
