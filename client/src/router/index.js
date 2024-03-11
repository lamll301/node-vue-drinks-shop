import { createRouter, createWebHistory } from 'vue-router';
import admin from './admin.js';
import site from './site.js';

const routes = [...admin, ...site];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;