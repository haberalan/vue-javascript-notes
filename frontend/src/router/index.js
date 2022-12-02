import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: { mustBeLogged: true },
  },
  {
    path: '/login',
    component: LoginView,
    meta: { mustBeLogged: false },
  },
  {
    path: '/signup',
    component: SignupView,
    meta: { mustBeLogged: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('VUE_JAVASCRIPT_NOTES-token');

  if (to.meta.mustBeLogged && !token) {
    next('/login');
  } else if (!to.meta.mustBeLogged && token) {
    next('/');
  } else {
    next();
  }
});

export default router;
