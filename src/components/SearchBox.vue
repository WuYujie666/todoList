<script setup lang="ts">
import { ref } from 'vue'

const searchText = ref('')
const emit = defineEmits(['search', 'clear'])

const handleSearch = () => {
    if (searchText.value.trim()) {
        emit('search', searchText.value.trim())
    }
}

const handleClear = () => {
    searchText.value = ''
    emit('clear')
}

const handleKeyup = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        handleSearch()
    }
}
</script>

<template>
    <div class="search-container">
        <div class="search-box">
            <input
                type="text"
                v-model="searchText"
                @keyup="handleKeyup"
                placeholder="搜索任务..."
                class="search-input"
            />
            <button v-if="searchText" @click="handleClear" class="clear-btn">×</button>
            <button @click="handleSearch" class="search-btn">搜索</button>
        </div>
    </div>
</template>

<style scoped>
.search-container {
    margin: 10px auto;
    width: 88%;
}

.search-box {
    display: flex;
    align-items: center;
    gap: 8px;
}

.search-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--second-color);
    border-radius: 5px;
    background-color: var(--main-color);
    color: var(--text-color);
    font-size: 14px;
}

.search-input:focus {
    outline: none;
    border-color: var(--second-color);
    box-shadow: 0 0 0 2px rgba(88, 199, 243, 0.2);
}

.search-input::placeholder {
    color: #a0a0a0;
}

.search-btn {
    padding: 8px 16px;
    background-color: var(--second-color);
    color: var(--text-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
}

.search-btn:hover {
    background-color: #4ab8e3;
}

.clear-btn {
    padding: 4px 8px;
    background: none;
    border: none;
    color: #a0a0a0;
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
}

.clear-btn:hover {
    color: var(--text-color);
}

@media screen and (max-width: 768px) {
    .search-container {
        width: 95%;
    }

    .search-input {
        font-size: 14px;
        padding: 6px 10px;
    }

    .search-btn {
        padding: 6px 12px;
        font-size: 14px;
    }
}
</style>
