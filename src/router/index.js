import Vue from 'vue'
import Router from 'vue-router'

import Register from '../views/Register.vue'
import SignIn from '../views/SignIn.vue'
import Home from '../views/Home.vue'
import PublicSea from '../views/PublicSea.vue'
import ChatRoom from '../views/ChatRoom.vue'
import Entertainment from '../views/Entertainment.vue'
import My from '../views/My.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/register', name: 'register', component: Register },
    { path: '/signin', name: 'signin', component: SignIn },
    { path: '/publicsea', name: 'publicsea', component: PublicSea },
    { path: '/chatroom', name: 'chatroom', component: ChatRoom },
    { path: '/entertainment', name: 'entertainment', component: Entertainment },
    { path: '/my', name: 'my', component: My }
  ]
})

export default router
