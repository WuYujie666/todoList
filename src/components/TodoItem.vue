<template>
    <li v-bind:class="{ completed: item.completed }">
        <!-- 不要把v-on:click写在这里，会变成点字变 -->
        <input
            type="checkbox"
            id="item"
            name="item"
            v-bind:checked="item.completed"
            v-on:click="toggleCompleted"
        />
        {{ item.content }}
        日期
        <button @click="deleteItem">删除</button>
        <!-- 未完成 -->
    </li>
</template>
<script setup lang="ts">
import { type Item } from '@/types'
const itemObj = defineProps<{ item: Item }>()
let item = itemObj.item

const emit = defineEmits(['toggleCompleted', 'deleteItem'])

function toggleCompleted() {
    emit('toggleCompleted')
    // item.completed = !item.completed//无法访问
}
function deleteItem() {
    emit('deleteItem')
}
// vue中最好不要直接操作dom。if (item.completed) document.getElementById('item').classList.remove('completed')
// else document.getElementById('item').classList.add('completed')
// 永久删除，不适合用计算属性。const deleteItem = computed(() => {})
</script>

<style scoped>
.completed {
    text-decoration: line-through;
}
input {
    width: 20px; /* 设置复选框的宽度 */
    height: 20px; /* 设置复选框的高度 */
    margin-right: 5px;
    vertical-align: middle;
}
</style>
