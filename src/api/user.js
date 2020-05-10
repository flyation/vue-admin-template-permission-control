import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserList() {
  return request({
    url: '/user/all',
    method: 'get'
  })
}

export function getUser(uid) {
  return request({
    url: `/user/${uid}`,
    method: 'get'
  })
}

export function updateUser(pojo) {
  return request({
    url: `/user/update`,
    method: 'post',
    data: pojo
  })
}
