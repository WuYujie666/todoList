<template>
    <div class="details">
        <textarea
            v-model="detailContent"
            class="detailInput"
            placeholder="请输入详情..."
        ></textarea>
        <button @click="closeDetail" class="closeButton">X</button>
    </div>
</template>
<script setup lang="ts" name="TaskDetail">
import { useRouter, useRoute } from 'vue-router'
import { defineEmits, ref, computed } from 'vue'
import { useTodo } from '@/stores/todo.ts' // Import the Pinia store

const router = useRouter()
const route = useRoute()
const todoStore = useTodo() // Use the store
const detailContent = computed({
    get: () => todoStore.todoList.find((item) => item.id === Number(route.query.id))?.detail || '',
    set: (value) => {
        const task = todoStore.todoList.find((item) => item.id === Number(route.query.id))
        if (task) {
            task.detail = value // Update the detail in the store
        }
    },
})
const emit = defineEmits(['updateContent'])

function closeDetail() {
    emit('updateContent', detailContent.value)
    router.push({ path: '/', query: { detailContent: detailContent.value } })
}
</script>

<style scoped>
.details {
    position: fixed; /* 固定定位 */
    right: 20px; /* 距离页面右侧20像素 */
    top: 20px; /* 距离页面顶部20像素 */
    width: 250px; /* 弹窗宽度 */
    background-color: var(--lighter-main-color); /* 背景颜色 */
    border-radius: 10px; /* 圆角边框 */
    border: none; /* 去掉边框 */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* 更柔和的阴影效果 */
    padding: 0px; /* 内边距 */
    z-index: 1000; /* 确保在其他内容之上 */
    transform: translateX(0); /* 初始位置 */
}
.closeButton {
    position: fixed;
    top: 20px; /* 距离窗口底部20px */
    right: 20px; /* 距离窗口左边20px */
    /* 其他按钮样式 */
}
.detailInput {
    width: 210px; /* 使文本框宽度适应容器 */
    height: 200px; /* 设置文本框高度 */
    border-radius: 5px; /* 圆角边框 */
    border: none; /* 边框样式 */
    margin: 10px;
    padding: 10px; /* 内边距 */
    background-color: var(--main-color);
    resize: none;
}
</style>
