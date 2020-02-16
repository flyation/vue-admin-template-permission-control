import request from '@/utils/request'

export default {
  // 查询所有教室日程
  getScheduleList(page, size, searchMap) {
    return request({
      url: `/reserve/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },

  // 提交预约申请
  apply(reservehMap) {
    return request({
      url: `/reserve/apply`,
      method: 'post',
      data: reservehMap
    })
  },

  // 查询该用户的所有预约记录
  getUserRecordList(page, size, uid) {
    return request({
      url: `/reserve/record/${uid}/${page}/${size}`,
      method: 'get'
    })
  },

  // 撤销预约申请
  cancel(id) {
    return request({
      url: `/reserve/cancel/${id}`,
      method: 'put'
    })
  }
}
