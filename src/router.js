import { createRouter, createWebHistory } from 'vue-router';
import Login from './app/views/Login.vue'
import Map from './app/views/Map.vue';

console.log('router is mounted');

const routes = [
    
  {
        path: '/',
        name: 'login',
        component: Login
    },
  {
    path: '/map',
    name: 'map',
    component: Map
  },
  // other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;