<template>
    <input type="text" name="newItem" id="input" placeholder="请输入新任务" v-model="newContent" />
    <button v-on:click="submit">提交</button>
</template>
<script setup>
import { ref } from 'vue'
const newContent = ref('')
const emit = defineEmits(['addItem'])
function submit() {
    emit('addItem', newContent.value)
    newContent.value = ''
}
</script>
<style scoped></style>
