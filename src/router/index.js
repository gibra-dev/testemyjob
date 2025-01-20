import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import SignUp from '@/views/SignUp.vue';
import SignIn from '@/views/SignIn.vue';
import Deposit from '@/views/Deposit.vue';
import Profile from '@/views/Profile.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }, // Protegido
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: Deposit,
      meta: { requiresAuth: true }, // Protegido
    },
    {
      path: '/sign-up/:invite_code?',
      name: 'sign-up',
      component: SignUp,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }, // Protegido
    },
  ],
});

// Guard de Rotas para Proteger Páginas
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user')); // Verifica se o usuário está autenticado

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
      // Redireciona para a página de login se o usuário não estiver autenticado
      next({ name: 'sign-in' });
    } else {
      next(); // Permite o acesso
    }
  } else {
    next(); // Continua para rotas públicas
  }
});

export default router;
