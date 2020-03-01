import request from '@/utils/request'

export default {
  // 查询所有教室日程（预约教室）
  getScheduleRoomList(page, size, searchMap) {
    return request({
      url: `/reserve/searchRoom/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },

  // 查询所有教室日程（预约座位）
  getScheduleSeatList(page, size, searchMap) {
    return request({
      url: `/reserve/searchSeat/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },

  // 提交预约申请
  apply(reserveMap) {
    return request({
      url: `/reserve/apply`,
      method: 'post',
      data: reserveMap
    })
  },

  // 提交预约申请
  applySeat(reserveMap) {
    return request({
      url: `/reserve/applySeat`,
      method: 'post',
      data: reserveMap
    })
  },

  // 查询该用户的所有预约记录
  getUserRecordList(page, size) {
    return request({
      url: `/reserve/record/${page}/${size}`,
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
