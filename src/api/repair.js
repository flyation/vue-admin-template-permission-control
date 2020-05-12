import request from '@/utils/request'

export default {
  // 查询所有报修记录
  findAll() {
    return request({
      url: `/repair/all`,
      method: 'get'
    })
  }
}
