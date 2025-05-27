<template>
    <div class="formLine">
        <input
            type="text"
            name="newItem"
            id="input"
            placeholder="请输入新任务..."
            v-model="newContent"
            class="inputBox roundBorder"
            v-on:keyup.enter="submit"
        />

        <input
            type="date"
            id="start"
            name="trip-start"
            class="inputBox roundBorder"
            v-model="newDateString"
        />
        <button v-on:click="submit" class="roundBorder" title="添加任务">✔</button>
    </div>
</template>
<script setup lang="ts">
import type { Item } from '@/types'
import { ref } from 'vue'
import { useTodo } from '@/stores/todo'
const newContent = ref('')
const emit = defineEmits(['addItem'])
const newDateString = ref<string>()
const todoStore = useTodo()
function submit() {
    if (newContent.value === '') {
        alert('请输入内容')
        return
    }

    // 生成唯一 ID
    const generateId = () => {
        return Date.now() + Math.floor(Math.random() * 1000)
    }

    const newItem: Item = {
        id: generateId(),
        content: newContent.value,
        title: newContent.value,
        completed: false,
        date: newDateString.value ? new Date(newDateString.value) : undefined,
    }

    todoStore.addItem(newItem)
    newContent.value = ''
}
</script>
<style scoped>
.formLine {
    display: flex;
    justify-content: center;
    gap: 14px; /* 添加固定的间距 */
}
.formLine input {
    width: 300px;
    height: 40px;
    background-color: var(--main-color);
    color: var(--text-color);
    text-indent: 8px;
    /* 好神奇啊 */
    padding: 0; /* 重置所有padding */
}
/* date显示字往右移动 */
input[type='date']::-webkit-calendar-picker-indicator {
    position: relative;
    left: -13px;
    filter: invert(1); /* 将图标颜色改为白色 */
}
input:focus,
.formLine button:active {
    border-radius: 30px;
    outline: 10px solid var(--second-color);
}

.roundBorder {
    border-radius: 6px;
    border: none;
    outline: 2px solid var(--second-color);
}
.formLine button {
    width: 50px;
    height: 40px;
    background-color: var(--second-color);
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.2s;
    padding: 0;
}
.formLine button:hover {
    background-color: #4ab8e3;
}
</style>
