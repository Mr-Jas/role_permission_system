import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/v1/token',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/v1/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/v1/user/logout',
    method: 'post'
  })
}

export function getUsersInfo() {
  return request({
    url: '/v1/user/',
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/v1/user/',
    method: 'post',
    data
  })
}

export function delUser(params) {
  return request({
    url: '/v1/user',
    method: 'delete',
    params
  })
}

export function updatePassword(data) {
  return request({
    url: '/v1/user/password',
    method: 'put',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/v1/user/role',
    method: 'put',
    data
  })
}

