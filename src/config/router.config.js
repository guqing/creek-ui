// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView } from '@/layouts'

export const asyncRouterMap = [
  {
    key: 'index',
    name: 'index',
    path: '/',
    component: BasicLayout,
    redirect: '/dashboard',
    meta: {
      title: 'menu.home',
      icon: 'dashboard',
    },
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', icon: 'dashboard' },
        children: [
          {
            name: 'Analysis',
            title: '分析页',
            path: '/dashboard/analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页' },
          },
          {
            name: 'Workplace',
            title: '工作台',
            path: '/dashboard/workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台' },
          },
        ],
      },
      {
        name: 'form',
        path: '/form',
        redirect: '/form/base-form',
        component: RouteView,
        meta: { title: '表单页', icon: 'form' },
        children: [
          {
            name: 'BaseForm',
            title: '基础表单',
            path: '/form/base-form',
            component: () => import('@/views/form/basicForm'),
            meta: { title: '基础表单' },
          },
          {
            name: 'StepForm',
            path: '/form/step-form',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '分步表单' },
          },
          {
            name: 'AdvanceForm',
            title: '高级表单',
            path: '/form/advanced-form',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单' },
          },
        ],
      },
      {
        name: 'RAM',
        path: '/ram',
        redirect: '/ram/user',
        component: RouteView,
        meta: {
          title: '系统管理',
          keepAlive: true,
          icon: 'safety-certificate',
          authority: ['read:role', 'read:group', 'read:user'],
        },
        children: [
          {
            name: 'User',
            path: '/ram/user',
            component: () => import('@/views/user/UserList'),
            meta: { title: '用户管理', authority: ['read:user'] },
          },
          {
            name: 'Role',
            path: '/ram/role',
            component: () => import('@/views/role/RoleList'),
            meta: { title: '角色管理', authority: ['read:role'] },
          },
          {
            name: 'UserGroup',
            path: '/ram/user/group',
            component: () => import('@/views/group/UserGroupList'),
            meta: { title: '用户组', authority: ['read:group'] },
          },
        ],
      },
      {
        name: 'Monitor',
        path: '/monitor',
        redirect: '/monitor/log/action',
        component: RouteView,
        meta: { title: '监控日志', icon: 'fund' },
        children: [
          {
            name: 'ActionLog',
            title: '系统日志',
            path: '/monitor/log/action',
            component: () => import('@/views/monitor/ActionLog'),
            meta: { title: '系统日志' },
          },
          {
            name: 'LoginLog',
            title: '登录日志',
            path: '/monitor/log/login',
            component: () => import('@/views/monitor/LoginLog'),
            meta: { title: '登录日志' },
          },
        ],
      },
      {
        name: 'credentials',
        path: '/credentials',
        meta: { title: '令牌管理', icon: 'safety-certificate' },
        component: () => import('@/views/credentials/List'),
      },
      {
        name: 'Account',
        path: '/account',
        redirect: '/account/center',
        component: RouteView,
        meta: { title: '个人页', icon: 'user' },
        children: [
          {
            name: 'AccountCenter',
            path: '/account/center',
            redirect: null,
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心' },
          },
        ],
      },
    ],
  },
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/Login'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/user/Register'),
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import('@/views/user/RegisterResult'),
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined,
      },
    ],
  },

  {
    path: '/404',
    component: () => import('@/views/exception/404'),
  },
]
