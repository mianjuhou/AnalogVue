import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Forms from '@/components/Forms'
import Run from '@/components/Run'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {allowBack: false}
    },
    {
      path: '/',
      name: 'Forms',
      component: Forms,
      meta: {allowBack: false}
    },
    {
      path: '/run',
      name: 'Run',
      component: Run,
      meta: {allowBack: false}
    }
  ]
})
