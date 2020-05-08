import request from '@/utils/request'

export default {
  // 查询所有教室日程（预约教室）
  getRoomSchedule(searchMap) {
    return request({
      url: `/qr/roomSchedule`,
      method: 'post',
      data: searchMap
    })
  },

  // 提交教室预约
  reserve(reserveMap) {
    return request({
      url: `/qr/reserve`,
      method: 'post',
      data: reserveMap
    })
  },

  test(reserveMap) {
    return request({
      url: `/qr/test`,
      method: 'post',
      data: reserveMap
    })
  }
}
