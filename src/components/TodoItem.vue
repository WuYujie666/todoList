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
        <button>删除</button>
        <!-- 未完成 -->
    </li>
</template>
<script setup>
const item = defineProps({
    //为什么大写？
    content: String,
    completed: Boolean,
})
const emit = defineEmits(['toggleCompleted'])

function toggleCompleted() {
    emit('toggleCompleted')
    // item.completed = !item.completed//无法访问
}
// if (item.completed) document.getElementById('item').classList.remove('completed')
// else document.getElementById('item').classList.add('completed')
</script>

<style scoped>
.completed {
    text-decoration: line-through;
}
</style>
