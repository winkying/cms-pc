import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'

Vue.use(VueResource);
Vue.use(ElementUI);
new Vue({
  el: '#app',
  render: h => h(App)
})
