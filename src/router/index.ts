import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { AuthService } from '@/services/auth.service.ts'
import type { AppUser } from '@/types/AppUser.ts'
import DashboardView from '@/views/DashboardView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import TermsView from '@/views/TermsView.vue'
import CookiesView from '@/views/CookiesView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import HomeView from '@/views/HomeView.vue'
const authService: AuthService = new AuthService()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' },
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
      meta: {
        guestOnly: false,
        title: 'AutoTracker | Track every order automatically',
        description:
          'AutoTracker finds your orders and shipments in Gmail, so you can track every delivery in one place.',
        canonical: '/home',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        guestOnly: true,
        title: 'Sign in | AutoTracker',
        description: 'Sign in to AutoTracker to manage and track your online orders.',
        canonical: '/login',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true,
        title: 'Orders dashboard | AutoTracker',
        description: 'View and organize your online orders in the AutoTracker dashboard.',
        canonical: '/dashboard',
      },
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsView,
      meta: {
        title: 'Terms of Service | AutoTracker',
        description: 'Terms governing the use of the AutoTracker service.',
        canonical: '/terms',
      },
    },
    {
      path: '/cookies',
      name: 'cookies',
      component: CookiesView,
      meta: {
        title: 'Cookie Policy | AutoTracker',
        description: 'Information about cookies and similar technologies used by AutoTracker.',
        canonical: '/cookies',
      },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView,
      meta: {
        title: 'Privacy Policy | AutoTracker',
        description:
          'How AutoTracker processes personal data under EU and Spanish data protection law.',
        canonical: '/privacy',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: 'Page not found | AutoTracker',
        description: 'The requested AutoTracker page could not be found.',
        canonical: '/404',
      },
    },
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

  document.title = String(to.meta.title || 'AutoTracker')
  const description =
    document.querySelector('meta[name="description"]') || document.createElement('meta')
  description.setAttribute('name', 'description')
  description.setAttribute(
    'content',
    String(to.meta.description || 'Track your online orders with AutoTracker.'),
  )
  document.head.appendChild(description)

  const socialMeta = [
    ['property', 'og:title', to.meta.title || 'AutoTracker'],
    [
      'property',
      'og:description',
      to.meta.description || 'Track your online orders with AutoTracker.',
    ],
    [
      'property',
      'og:url',
      new URL(String(to.meta.canonical || to.fullPath), window.location.origin).href,
    ],
    ['property', 'og:type', 'website'],
    ['name', 'twitter:card', 'summary'],
    ['name', 'twitter:title', to.meta.title || 'AutoTracker'],
    [
      'name',
      'twitter:description',
      to.meta.description || 'Track your online orders with AutoTracker.',
    ],
  ]

  socialMeta.forEach(([attribute, value, content]) => {
    const tag =
      document.querySelector(`meta[${attribute}="${value}"]`) || document.createElement('meta')
    tag.setAttribute('content', String(content))
    document.head.appendChild(tag)
  })

  const canonical =
    document.querySelector('link[rel="canonical"]') || document.createElement('link')
  canonical.setAttribute('rel', 'canonical')
  canonical.setAttribute(
    'href',
    new URL(String(to.meta.canonical || to.fullPath), window.location.origin).href,
  )
  document.head.appendChild(canonical)

  // Public routes (landing page)
  return next()
})

export default router
