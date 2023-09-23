import { createRouter, createWebHistory } from "vue-router";

import Home from '../pages/Home.vue'
import ProductList from '../pages/ProductList.vue'
import ProductDetails from '../pages/ProductDetails.vue'

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/products', component: ProductList, name: 'products' },
    { path: '/products/:id', component: ProductDetails, name: 'product' },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;