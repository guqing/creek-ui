import { constantRouterMap, asyncRouterMap } from '@/config/router.config'

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
    GenerateRoutes ({ commit }) {
      return new Promise((resolve) => {
        // const { roles } = data
        // const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', asyncRouterMap)
        resolve()
      })
    },
  },
}

export default permission
