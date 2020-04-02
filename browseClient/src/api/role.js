import request from '@/utils/request'

export function getRoleList() {
  return request({
    url: '/v1/role',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/v1/role',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/v1/role',
    method: 'put',
    data
  })
}

export function deleteRole(params) {
  return request({
    url: '/v1/role',
    method: 'delete',
    params
  })
}
