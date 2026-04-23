import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import MakelineList from '../views/MakelineList.vue'

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/products', component: ProductList },
  { path: '/makeline', component: MakelineList }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router