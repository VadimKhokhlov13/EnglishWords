import Vue from 'vue';
import Router from 'vue-router';
import Add from '@/views/Add';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Add
        },
        {
            path: '/learn',
            component: () => import('./views/Learn.vue')
        },
        {
            path: '/words',
            component: () => import('./views/Words.vue')
        }
    ]
})