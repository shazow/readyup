import Vue from 'vue'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueFire)

import db from './db'
import App from './App.vue'
import Room from './views/Room.vue'
import Index from './views/Index.vue'

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    { path: '/', name: 'index', component: Index },
    { path: '/room/:id', name: 'room', component: Room },
  ]
})

const app = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

export { app, router, db }
