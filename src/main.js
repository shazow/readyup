import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'

Vue.use(VueFire)
Vue.use(VueRouter)

import db from './db'
import App from './App.vue'
import Room from './views/Room.vue'

const Index = {
  name: 'Index',
  template: '<div>Creating room...</div>',
  mounted() {
    this.$router.push({ name: 'room', params: { id: 123 }})
  },
}

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    { path: '/', name: 'index', component: Index },
    { path: '/room/:id', name: 'room', component: Room },
  ]
})

const app = new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

export { app, router, db }
