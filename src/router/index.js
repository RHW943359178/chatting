import Vue from 'vue'
import Router from 'vue-router'

import Register from '../views/Register.vue'
import Home from '../views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/register', name: 'register', component: Register }
  ]
})

export default router
