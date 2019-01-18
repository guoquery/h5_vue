import Vue from 'vue'
import vueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import personal from '@/pages/personal/personal.vue'
const home  = () =>import('@/pages/home/home.vue')
const personal  = () =>import('@/pages/personal/personal.vue')

Vue.use(vueRouter)

const router = new vueRouter({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      beforeEnter: (to, from, next) => {
        console.log('beforEnter',to,from)
        next();
        // ...
      }
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal,
      beforeEnter: (to, from, next) => {
        console.log('beforEnter',to,from)
        next();
        // ...
      }
    }
  ]
})
/**
 * 1、导航被触发。
   2、在失活的组件里调用离开守卫。
   3、调用全局的 beforeEach 守卫。
      在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
      在路由配置里调用 beforeEnter。
      解析异步路由组件。
      在被激活的组件里调用 beforeRouteEnter。
      调用全局的 beforeResolve 守卫 (2.5+)。
      导航被确认。
      调用全局的 afterEach 钩子。
      触发 DOM 更新。
      用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数
 * 
 */
/**全局前置守卫 */
router.beforeEach((to, from, next) => {
  console.log('beforeEach',to,from)
  next();
  // ...
})
/**全局后置守卫 */
router.afterEach((to, from) => {
  console.log('afterEach',to,from)
  // ...
})
/**
 * 组件内调用
 *  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
 */

export default router
