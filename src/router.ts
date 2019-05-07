import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadApp() {
  return () => import(`@/App.vue`)
}

function loadComponentBase(component: string) {
  return () => import(`@/components/base/${component}.vue`)
}

function loadMainView(view: string) {
  return () => import(`@/views/main/${view}.vue`)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      meta: { title: 'Enter site', nolayout: true },
      component: () => import(`@/views/EnterSite.vue`)
    },
    {
      path: '/about_june',
      meta: { title: 'About Juné', nolayout: false },
      component: loadMainView('AboutJune')
    },
    {
      path: '/schedule_event',
      meta: { title: 'Schedule Event', nolayout: false },
      component: loadMainView('ScheduleEvent')
    },
    {
      path: '/performance',
      meta: { title: 'Performance', nolayout: false },
      component: loadMainView('Performance')
    },
    {
      path: '/gallery',
      meta: { title: 'Gallery', nolayout: false },
      component: loadMainView('Gallery')
    },
    {
      path: '/song',
      meta: { title: 'Song', nolayout: false },
      component: loadMainView('Song')
    },
    {
      path: '/shop',
      meta: { title: 'Shop', nolayout: false },
      component: loadMainView(`Shop`)
    },
    {
      path: '/follow_up',
      meta: { title: 'Follow up', nolayout: false },
      component: loadMainView(`FollowUp`)
    },
    {
      path: '*',
      meta: { title: 'Error - 404', nolayout: true },
      component: loadComponentBase(`error/404`)
    }
  ]
})
