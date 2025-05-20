import { createRouter, createWebHistory } from 'vue-router'
import TaskDetail from '../views/TaskDetail.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/detail',
            name: 'detail',
            component: TaskDetail,
            props: true,
        },
    ],
})

export default router
