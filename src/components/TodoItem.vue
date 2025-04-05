<template>
    <tr v-bind:class="{ completed: item.completed }">
        <!-- 不要把v-on:click写在这里，会变成点字变 -->
        <th>{{ item.content }}</th>
        <th>{{ dateString }}</th>
        <th>
            <input type="checkbox" id="item" name="item" v-model="item.completed" />
            <button @click="deleteItem">删除</button>
            <RouterLink
                :to="{
                    path: '/detail',
                    query: { id: item.id },
                }"
            >
                <button>详情</button>
            </RouterLink>
        </th>
    </tr>
    <RouterView></RouterView>
</template>
<script setup lang="ts">
import { type Item } from '@/types'
import TaskDetail from '@/views/TaskDetail.vue'
import { useDate } from '@/hooks/useDate'
import { RouterView, RouterLink } from 'vue-router'
// 定义 props 和 emits
const { item } = defineProps<{ item: Item }>()
const emit = defineEmits(['deleteItem'])

// 使用自定义 Hook 格式化日期
const { dateString } = useDate(item.date)

// 删除任务函数
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
