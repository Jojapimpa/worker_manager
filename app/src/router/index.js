import Vue from 'vue'
import Router from 'vue-router'

import * as Auth from '@/components/pages/auth'

import auth from '@/components/pages/auth/auth'
import homeAdmin from '@/components/pages/homeAdmin/homeAdmin'
import homeSecretary from '@/components/pages/homeSecretary/homeSecretary'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: homeAdmin,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/secretary',
      name: 'secretary',
      component: homeSecretary,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/login',
      name: 'auth',
      component: auth,
      meta: {
        requiredNoAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth && !Auth.default.checkAuthentication()) {
    return router.push('/login')
  }

  if (to.meta.requiredNoAuth && Auth.default.checkAuthentication()) {
    return router.push('/')
  }

  if (to.path === '/') {
    return router.push(Auth.default.getType() === 'secretary' ? '/secretary' : '/admin')
  }

  next()
})

export default router
