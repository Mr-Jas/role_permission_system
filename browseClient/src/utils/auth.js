import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * 按钮鉴权
 */
import Vue from 'vue'
import store from '@/store'
const auth = value => {
  let auth
  if (typeof value === 'string') {
    auth = store.getters.hasAuthorization(value)
  } else {
    auth = value.some(item => {
      return store.getters.hasAuthorization(item)
    })
  }
  return auth
}
// 注册 v-auth 按钮鉴权指令
Vue.directive('auth', {
  inserted: (el, binding) => {
    if (!auth(binding.value)) {
      el.remove()
    }
  }
})
// 挂载 this.$auth() 方法
Vue.prototype.$auth = auth
