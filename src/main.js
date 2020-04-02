import Vue from 'vue'
import  VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ElementUI);


Vue.use(VueAxios, axios)

axios.defaults.baseURL ="/api"
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
