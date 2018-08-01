import Vue from 'vue'
import Router from 'vue-router'
import goods from 'component/goods/goods'
import evaluate from 'component/evaluate/evaluate'
import merchant from 'component/merchant/merchant'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      component: goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: evaluate
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: merchant
    }
  ]
})
