import { createRouter, createWebHistory } from 'vue-router';
import Home from './app/views/Home.vue'
import Map from './app/views/Map.vue';

console.log('router is mounted');

const routes = [
    
    {
        path: '/',
        name: 'home',
        component: Home
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