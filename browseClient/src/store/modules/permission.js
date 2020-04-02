import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(authorization, route) {
  if (route.meta && route.meta.auth) {
    return authorization.some(auth => {
      return route.meta.auth.some(routeAuth => {
        return routeAuth === auth
      })
    })
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, authorization) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(authorization, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, authorization)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: [],
  authorization: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_AUTHORIZATION: (state, authList) => {
    state.authorization = authList
  }
}

const actions = {
  generateRoutes({ commit }, authList) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, authList)
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_AUTHORIZATION', authList)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
