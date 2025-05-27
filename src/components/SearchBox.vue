<script setup lang="ts">
import { ref, watch } from 'vue'

const searchText = ref('')
const emit = defineEmits(['search', 'clear'])

// 防抖函数
const debounce = (fn: Function, delay: number) => {
    let timer: number | null = null
    return function (this: any, ...args: any[]) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

// 统一的搜索处理函数
const handleSearch = (value: string) => {
    const trimmedValue = value.trim()
    if (trimmedValue) {
        emit('search', trimmedValue)
    } else {
        emit('clear') // 空值时清空搜索
    }
}

// 防抖搜索（用于输入时的实时搜索）
const debouncedSearch = debounce(handleSearch, 300)

// 监听输入变化，实时搜索
watch(searchText, (newValue) => {
    debouncedSearch(newValue)
})

// 清空搜索
const handleClear = () => {
    searchText.value = ''
    emit('clear')
}

// Enter键立即搜索（不防抖）
const handleKeyup = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        handleSearch(searchText.value)
    }
}
</script>

<template>
    <div class="search-box">
        <input
            type="text"
            v-model="searchText"
            @keyup="handleKeyup"
            placeholder="搜索任务..."
            class="search-input"
        />
        <button v-if="searchText" @click="handleClear" class="clear-btn" title="清空搜索">×</button>
    </div>
</template>

<style scoped>
.search-box {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
}

.search-input {
    flex: 1;
    height: 40px;
    padding: 0 12px;
    border: none;
    border-radius: 6px;
    background-color: var(--main-color);
    color: var(--text-color);
    outline: 2px solid var(--second-color);
}

.search-input:focus {
    border-radius: 30px;
    outline: 10px solid var(--second-color);
}

.clear-btn {
    position: absolute;
    right: 8px;
    padding: 4px 8px;
    background: none;
    border: none;
    color: #a0a0a0;
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    transition: color 0.2s;
    border-radius: 50%;
}

.clear-btn:hover {
    color: var(--text-color);
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
