import Vue from 'vue'
import VueFire from 'vuefire'

Vue.use(VueFire)

import App from './App.vue'


const vm = new Vue({
  el: '#readyup',
  render: h => h(App)
})
