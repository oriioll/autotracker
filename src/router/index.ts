import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import EmailsView from '@/views/EmailsView.vue'
import { AuthService } from '@/services/auth.service.ts'
import type { AppUser } from '@/types/AppUser.ts'
const authService: AuthService = new AuthService()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      //meta: { guestOnly: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: EmailsView,
      meta: { requiresAuth: true },
    },
    /*{
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { public: true },
    },*/
  ],
})

// Guard
router.beforeEach(async (to, from, next) => {
  let user: AppUser | null = null
  try {
    user = await authService.getMe()
  } catch {
    user = null
  }
  // Required user routes (dashboard)
  if (to.meta.requiresAuth && !user) {
    return next({ name: 'login' })
  }

  // Guest only routes (login/register)
  if (to.meta.guestOnly && user) {
    return next({ name: 'dashboard' })
  }

  // Public routes (landing page)
  return next()
})

export default router
