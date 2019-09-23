import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/JsonDiffPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: 'JSON在线对比工具 by upuptop'
      }
    }
  ]
})
