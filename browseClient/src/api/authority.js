import request from '@/utils/request'

export function getModules() {
  return request({
    url: '/v1/modules',
    method: 'get'
  })
}

export function getOperates() {
  return request({
    url: '/v1/operates',
    method: 'get'
  })
}

export function getAuths() {
  return request({
    url: '/v1/authority',
    method: 'get'
  })
}

export function addAuth(data) {
  return request({
    url: '/v1/authority',
    method: 'post',
    data
  })
}

export function updateAuth(data) {
  return request({
    url: '/v1/authority',
    method: 'put',
    data
  })
}

export function deleteAuth(params) {
  return request({
    url: '/v1/authority',
    method: 'delete',
    params
  })
}
