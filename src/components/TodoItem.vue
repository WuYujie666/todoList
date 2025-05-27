<template>
    <tr v-bind:class="{ completed: item.completed }">
        <!-- 使用插槽，让父组件决定内容 -->
        <slot></slot>
    </tr>
</template>

<script setup lang="ts">
import { type Item } from '@/types'

// 只需要接收 item 用于判断 completed 状态
const { item } = defineProps<{ item: Item }>()
</script>

<style scoped>
.completed {
    text-decoration: line-through;
}
input {
    width: 15px; /* 设置复选框的宽度 */
    height: 15px; /* 设置复选框的高度 */
    vertical-align: middle;
}
button {
    margin-left: 5px;
}
</style>
