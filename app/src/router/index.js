import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'auth',
      component: auth,
      meta: {
        requiredNoAuth: true
      }
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth && !Auth.default.checkAuthentication()) {
    return router.push('/login')
  }

  if (to.path === '/') {
    return router.push('/login')
  }

  next()
})


export default router
