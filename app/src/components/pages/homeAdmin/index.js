import Axios from 'axios'

const API = `http://${window.location.hostname}:3001`

export default {
  getList (context) {
    Axios.get(`${API}/api/v1/secretary/list`).then(({data}) => {
      context.users = data
    })
  },

  edit (context, info) {
    context.credentials = Object.assign({}, info)
    context.dialog = true
  },

  update (context, info) {
    context.dialog = false
    let method = (info._id) ? 'update' : 'add'
    Axios.post(`${API}/api/v1/secretary/${method}`, info).then(({data}) => {
      if (!data.success) {
        context.snackbar = true
        context.message = data.message || 'Хмм... Кажется у нас есть некоторые проблемы'
        return
      }

      this.getList(context)
    })
  },

  delete (context, info) {
    Axios.post(`${API}/api/v1/worker/secretary`, info).then(({data}) => {
      if (!data.success) {
        context.snackbar = true
        context.message = data.message || 'Хмм... Кажется у нас есть некоторые проблемы'
        return
      }

      this.getList(context)
    })
  },

  search (context, string) {
    if (!this.workers || this.workers.length === 0) {
      return
    }

    string = string.trim()

    let found = [];

    [
      'fio',
      'username',
      'email'
    ].forEach(field => {
      found.push.apply(found, this.workers.filter(item => !!`${item[field]}`.match(string)))
    })

    context.workers = found.filter((item, index) => {
      this.items = this.items || []
      this.items.push(item._id)
      return this.items.indexOf(item._id) === index
    })
  }
}
