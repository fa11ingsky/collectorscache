// Vue libraries
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// CSS 
import "bootstrap/dist/css/bootstrap.min.css"
import './assets/main.css'
import './assets/all.min.css'
import './assets/cart.css'
import './assets/responsive.css'

// Components
import App from './App.vue'
const app = createApp(App)

// Lazy load routes
const loadComponent = {
    'Products': () => import('./components/Products.vue'),
    'Checkout': () => import('./components/Checkout.vue'),
    'ProductInfo': () => import('./components/ProductInfo.vue'),
    'NotFound': () => import('./components/NotFound.vue')
}

const routes = [
    { path: '/', component: loadComponent['Products'] },
    { path: '/checkout', component: loadComponent['Checkout'] },
    { path: '/info/:product', component: loadComponent['ProductInfo'] },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: loadComponent['NotFound'] }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

app.use(router)
app.mount('#app')