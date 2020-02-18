import request from '@/utils/request'

export default {
  // 查询所有预约申请
  getReserveList(page, size) {
    return request({
      url: `/check/all/${page}/${size}`,
      method: 'get'
    })
  },
  // 查询所有预约申请
  check(id, flag) {
    return request({
      url: `/check/${id}?flag=${flag}`,
      method: 'put'
    })
  }
}
