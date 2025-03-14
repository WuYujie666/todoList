<template>
    <li v-bind:class="{ completed: item.completed }">
        <!-- 不要把v-on:click写在这里，会变成点字变 -->
        <input type="checkbox" id="item" name="item" v-model="item.completed" />
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

const emit = defineEmits(['deleteItem'])

function deleteItem() {
    emit('deleteItem', item.id)
    console.log('子删除' + item.id)
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
