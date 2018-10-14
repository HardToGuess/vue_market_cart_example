import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './Index.vue'
import store from './store'
import routes from './routes.js'
import './main.css'
import 'materialize-css/dist/css/materialize.css'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  store,
  router
}).$mount('#app')
