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
        /><!-- v-on:keyup.enter="submit"回车提交 -->

        <input
            type="date"
            id="start"
            name="trip-start"
            class="inputBox roundBorder"
            v-model="newDateString"
        />
        <button v-on:click="submit" class="roundBorder">✔</button>
    </div>
</template>
<script setup lang="ts">
import type { Item } from '@/types'
import { ref } from 'vue'
let newId = 3
const newContent = ref('')
const emit = defineEmits(['addItem'])
const newDateString = ref<string>()
function submit() {
    if (newContent.value === '') {
        alert('请输入内容')
        return
    }
    const newItem: Item = {
        id: newId++,
        content: newContent.value,
        completed: false,
    }
    if (newDateString.value) {
        newItem.date = new Date(newDateString.value)
    }
    emit('addItem', newItem)
    newContent.value = ''
}
</script>
<style scoped>
.formLine {
    display: flex;
    justify-content: center;
    margin: auto 5%;
}
.formLine input {
    width: 300px;
    height: 40px;
    margin: auto 7px;
    background-color: var(--main-color);
    color: var(--text-color);
    text-indent: 8px;
    /* 好神奇啊 */
}
/* date显示字往右移动 */
input[type='date']::-webkit-calendar-picker-indicator {
    position: relative;
    left: -13px;
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
}
</style>
