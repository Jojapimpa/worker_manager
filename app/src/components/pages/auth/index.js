import Vue from 'vue'
import Axios from 'axios'
import router from '@/router'

const API = `http://${window.location.hostname}:3001`

export default {
  user: {authenticated: false},

  authenticate (context, credentials, redirect) {
    Axios.post(`${API}/api/v1/auth`, credentials)
      .then(({data}) => {
        context.$cookie.set('token', data.token, '1D')
        context.$cookie.set('type', data.user.type, '1D')
        context.validLogin = true
        this.user.authenticated = true

        if (redirect) router.push(redirect)
      }).catch((err) => {
        console.log(err)
        let data = {message: 'Логин или пароль не верны.'}
        context.snackbar = true
        context.message = data.message
      })
  },

  checkAuthentication () {
    const token = Vue.cookie.get('token')
    this.user.authenticated = !!token

    if (this.user.authenticated) {
      Axios.defaults.headers.common['Authorization'] = this.getAuthenticationHeader()
    } else {
      delete Axios.defaults.headers.common['Authorization']
    }

    return this.user.authenticated
  },

  getType () {
    return Vue.cookie.get('type')
  },

  getAuthenticationHeader () {
    return `Bearer ${Vue.cookie.get('token')}`
  }

}
