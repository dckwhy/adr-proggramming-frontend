import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/LandingView.vue')
    },
    {
      path: '/metode-pembayaran',
      name: 'metode-pembayaran',
      component: () => import('../views/MetodePembayaranView.vue')
    },
    {
      path: '/faq-bisnis',
      name: 'faq-bisnis',
      component: () => import('../views/FAQBisnis.vue')
    },
    {
      path: '/faq-joki',
      name: 'faq-joki',
      component: () => import('../views/FAQJoki.vue')
    },
  ]
})
let pathTo = [];
router.beforeEach((to, from) => {
  if (pathTo.length < 2) {
    pathTo.push(to.fullPath)
  }
})

export default router
