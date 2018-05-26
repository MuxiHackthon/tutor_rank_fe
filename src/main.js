import Vue from 'vue'
import router from './router-config'
import App from './App.vue'

import VmRate from 'vue-multiple-rate'
import 'vue-multiple-rate/lib/rate.css'

Vue.component(VmRate.name, VmRate)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})