import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/qr',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'room/:cid',
        name: 'qr_room',
        component: () => import('@/views/qr/Room'),
        meta: { title: '二维码预约教室', icon: 'form' }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    name: 'User',
    alwaysShow: true, // 一直显示根路由
    meta: { title: '个人中心', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'Record',
        component: () => import('@/views/profile/index'),
        meta: { title: '预约记录', icon: 'documentation' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/reserve',
    component: Layout,
    redirect: '/reserve/index',
    meta: { title: '预约选择', icon: 'guide', activeMenu: 2, roles: ['admin', 'teacher', 'editor'] },
    children: [
      {
        path: 'index',
        name: 'Reserve',
        component: () => import('@/views/reserve/index'),
        meta: { title: '模式选择', icon: 'example', roles: ['admin', 'teacher', 'editor'] },
      },
      {
        path: 'room',
        name: 'Room',
        component: () => import('@/views/reserve/Room'),
        meta: { title: '预约教室', icon: 'tab', roles: ['admin', 'teacher'] }
      },
      {
        path: 'seat',
        name: 'Seat',
        component: () => import('@/views/reserve/Seat'),
        meta: { title: '预约座位', icon: 'table', roles: ['admin', 'teacher', 'editor'] }
      }
    ]
  },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/check',
    name: 'Admin',
    meta: { title: '管理中心', icon: 'edit', roles: 'admin' },
    children: [
      {
        path: 'check',
        name: 'Check',
        component: () => import('@/views/admin/check'),
        meta: { title: '预约审核', icon: 'list' }
      },
      {
        path: 'classroom',
        name: 'Classroom',
        component: () => import('@/views/admin/classroom'),
        meta: { title: '教室管理', icon: 'documentation' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/admin/user'),
        meta: { title: '用户管理', icon: 'clipboard' }
      }
    ]
  },

  // 原代码中该404页面放在asyncRoutes的最后
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
