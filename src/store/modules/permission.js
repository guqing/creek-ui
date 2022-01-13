import { constantRouterMap, asyncRouterMap } from '@/config/router.config'

function hasAuthority (authorities, route) {
  if (route.meta && route.meta.authority) {
    let flag = false
    for (let i = 0, len = authorities.length; i < len; i++) {
      flag = route.meta.authority.includes(authorities[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

function filterAsyncRouter (routerMap, authorities) {
  const accessedRouters = routerMap.filter((route) => {
    if (hasAuthority(authorities, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, authorities)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise((resolve) => {
        const { scopes } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, scopes)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
  },
}

export default permission
