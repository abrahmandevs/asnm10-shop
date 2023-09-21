import { createRouter, createWebHistory } from "vue-router";

import HelloWorld from '../components/HelloWorld.vue'
const routes = [
    { path: '/', component: HelloWorld, name: 'home' }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;