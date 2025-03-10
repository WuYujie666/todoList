<template>
    <div class="formLine">
        <input
            type="text"
            name="newItem"
            id="input"
            placeholder="请输入新任务..."
            v-model="newContent"
            class="inputBox roundBorder"
        />
        <input
            type="date"
            id="start"
            name="trip-start"
            value="2023-01-01"
            class="inputBox roundBorder"
        />
        <button v-on:click="submit" class="roundBorder">✔</button>
    </div>
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
<style>
:root {
    --main-color: #2d1b69;
    --second-color: #58c7f3;
    --text-color: #ffffff;
}

.formLine {
    display: flex;
    justify-content: center;
    margin: auto 5%;
}
input {
    width: 300px;
    height: 40px;
    margin: auto 7px;
    background-color: var(--main-color);
    color: var(--text-color);
    text-indent: 8px;
    /* 好神奇啊 */
}
input[type='date']::-webkit-calendar-picker-indicator {
    position: relative;
    left: -13px;
}
.roundBorder {
    border-radius: 6px;
    border: 2px solid var(--second-color);
}
.formLine button {
    width: 50px;
    height: 44px;
    margin: auto 7px;
    background-color: var(--second-color);
}
</style>
