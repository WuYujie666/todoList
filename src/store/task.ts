import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Item } from '@/types'

const useTask = defineStore('task', () => {
    const tasks = ref<Item[]>([])
    const completedTasks = ref<Item[]>([])

    const addTask = (task: Item) => {
        tasks.value.push(task)
    }

    const completeTask = (taskId: number) => {
        const taskIndex = tasks.value.findIndex((task) => task.id === taskId)
        if (taskIndex !== -1) {
            completedTasks.value.push(tasks.value[taskIndex])
            tasks.value.splice(taskIndex, 1)
        }
    }

    return { tasks, completedTasks, addTask, completeTask }
})
