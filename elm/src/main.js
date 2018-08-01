// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import './common/less/index.less'  //在main.js中引入全局的样式，这样就不需要在个组件中去引入
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(vueResource)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
