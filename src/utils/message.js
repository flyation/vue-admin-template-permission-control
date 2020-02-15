import { Message } from 'element-ui'
export default {
  handleShowMessage(obj, vue) {
    obj.then(response => {
      if (response.flag === true) {
        Message({
          message: response.message,
          type: 'success'
        })
        vue.fetchData()
      } else {
        Message({
          message: response.message,
          type: 'error'
        })
      }
    })
  }
}
