import Vue from 'vue'
import Toast from './toast'

const ToastComponent = Vue.extend(Toast)

const initArea = () => {
  const area = document.querySelector('.ubu-toast-area')
  if (area) return area
  const _div = document.createElement('div')
  _div.classList.add('ubu-toast-area')
  document.body.appendChild(_div)
  return _div
}

const insertToArea = (area, el, id) => {
  el.setAttribute('id', `ubu-toast-${id}`)
  area.appendChild(el)

  const timer = setTimeout(() => {
    el.classList.add('visible')
    clearTimeout(timer)
  }, 0)
}

const destroyToast = (id, all) => {
  const el = all ? initArea() : document.querySelector(`#ubu-toast-${id}`)
  if (!el) return
  el.setAttribute('style', 'opacity: 0; visibility: hidden')
  const timer = setTimeout(() => {
    el.parentElement.removeChild(el)
    clearTimeout(timer)
  }, 500)
}

const createToast = (options) => {
  const instance = new ToastComponent({
    mounted() {
      this.init(options)
    },
  })
  instance.vm = instance.$mount()
  instance.close = () => destroyToast(instance._uid)
  insertToArea(initArea(), instance.vm.$el, instance._uid)

  // auto remove element
  if (options.duration || options.duration === undefined) {
    const t = Number.isNaN(+options.duration) ? 4500 : options.duration
    const timer = setTimeout(() => {
      instance.close()
      clearTimeout(timer)
    }, t)
  }
  return instance
}

const assignOptions = (options, obj) => {
  const source = typeof options !== 'object' ? { text: options } : options
  return Object.assign({}, source, obj)
}

const hooks = () => ({
  show(options) {
    return createToast(options)
  },

  success(options) {
    return this.show(assignOptions(options, { type: 'success' }))
  },

  warning(options) {
    return this.show(assignOptions(options, { type: 'warning' }))
  },

  danger(options) {
    return this.show(assignOptions(options, { type: 'danger' }))
  },

  closeAll() {
    destroyToast(0, true)
  },
})

export default {
  install: (vue) => (vue.prototype.$Toast = hooks(vue)),
}
