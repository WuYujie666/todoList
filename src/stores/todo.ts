import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Item } from '@/types'

export const useTodo = defineStore(
    'todo',
    () => {
        const todoList = ref<Item[]>([])

        function addItem(newItem: Item) {
            todoList.value.push(newItem)
        }

        const completeTask = (taskId: number) => {
            const taskIndex = todoList.value.findIndex((item) => item.id === taskId)
            if (taskIndex !== -1) {
                todoList.value[taskIndex].completed = true
            }
        }

        function deleteItem(itemId: number) {
            const itemIndex = todoList.value.findIndex((item) => item.id === itemId)
            if (itemIndex !== -1) {
                todoList.value.splice(itemIndex, 1)
            }
        }

        return { todoList, addItem, completeTask, deleteItem }
    },
    { persist: true },
)
