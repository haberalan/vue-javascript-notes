import { createRouter, createWebHistory } from 'vue-router';

import TheHeader from '../components/layout/TheHeader.vue';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import NoteView from '../views/NoteView.vue';
import NewNoteView from '../views/NewNoteView.vue';

const routes = [
  {
    path: '/',
    components: { default: HomeView, header: TheHeader },
    meta: { mustBeLogged: true },
  },
  {
    path: '/note/:id',
    components: { default: NoteView, header: TheHeader },
    meta: { mustBeLogged: true },
    props: true,
  },
  {
    path: '/new',
    components: { default: NewNoteView, header: TheHeader },
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
  {
    path: '/:catchAll(.*)*',
    redirect: () => {
      return { path: '/login' };
    },
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
