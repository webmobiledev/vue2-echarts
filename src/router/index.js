import Vue from 'vue'
import Router from 'vue-router'
import Echart from '@/components/Echart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Echart',
      component: Echart
    }
  ]
})
