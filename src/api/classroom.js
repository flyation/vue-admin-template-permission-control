import request from '@/utils/request'

export default {
  // 查询所有
  getPageList(page, size) {
    return request(
      {
        url: `/classroom/all/${page}/${size}`,
        method: 'get'
      }
    )
  },
  // 按id查询
  findById(id) {
    return request(
      {
        url: `/classroom/${id}`,
        method: 'get'
      }
    )
  },
  // 新增
  save(searchMap) {
    return request(
      {
        url: '/classroom',
        method: 'post',
        data: searchMap
      }
    )
  },
  // 编辑
  update(id, searchMap) {
    return request(
      {
        url: `/classroom/${id}`,
        method: 'put',
        data: searchMap
      }
    )
  },
  // 按id删除
  deleteById(id) {
    return request(
      {
        url: `/classroom/${id}`,
        method: 'delete'
      }
    )
  }
}
