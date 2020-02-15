import request from '@/utils/request'

export default {
  // 查询所有
  getPageList(page, size, searchMap) {
    return request(
      {
        url: `/reserve/search/${page}/${size}`,
        method: 'post',
        data: searchMap
      }
    )
  },
  // 提交预约申请
  apply(reservehMap) {
    return request(
      {
        url: `/reserve/apply`,
        method: 'post',
        data: reservehMap
      }
    )
  }
}
