import { createRouter, createWebHistory } from 'vue-router'
import TaskDetail from '../views/TaskDetail.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/detail',
            component: TaskDetail,
        },
    ],
})

export default router
