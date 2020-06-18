import Axios from 'axios'

const API = `http://${window.location.hostname}:3001`

export default {

  workers: null,

  getList (context) {
    Axios.get(`${API}/api/v1/worker/list`).then(({data}) => {
      this.workers = data
      context.workers = data
    })
  },
  addNew (context) {
    Axios.post(`${API}/api/v1/worker/add`, context.credentials).then(({data}) => {
      if (!data.success) {
        context.snackbar = true
        context.message = data.message || 'Хмм... Кажется у нас есть некоторые проблемы'
        return
      }

      this.getList(context)
    })
  },
  workerEdit (context, worker) {
    context.worker_edit = Object.assign({}, worker)
    context.dialog = true
  },
  workerUpdate (context, worker) {
    context.dialog = false
    let method = (worker._id) ? 'update' : 'add'
    Axios.post(`${API}/api/v1/worker/${method}`, worker).then(({data}) => {
      if (!data.success) {
        context.snackbar = true
        context.message = data.message || 'Хмм... Кажется у нас есть некоторые проблемы'
        return
      }

      this.getList(context)
    })
  },
  deleteItem (context, worker) {
    Axios.post(`${API}/api/v1/worker/remove`, worker).then(({data}) => {
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
      context.workers = this.workers
      return
    }

    string = string.trim()

    let found = [];

    [
      'fio',
      'position',
      'email',
      'salary'
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
