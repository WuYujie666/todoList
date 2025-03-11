<template>
    <li v-bind:class="{ completed: item.completed }">
        <!-- 不要把v-on:click写在这里，会变成点字变 -->
        <input
            type="checkbox"
            id="item"
            name="item"
            v-bind="item.completed"
            v-on:click="toggleCompleted"
        />
        {{ item.content }}
        日期
        <button @click="deleteItem">删除</button>
        <!-- 未完成 -->
    </li>
</template>
<script setup>
const item = defineProps({
    //为什么大写？
    id: Number,
    content: String,
    completed: Boolean,
})
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
    transform: scale(1.6);
    margin-right: 5px;
}
</style>
