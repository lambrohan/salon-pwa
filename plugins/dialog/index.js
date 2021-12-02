import Vue from 'vue'
import Dialog from './dialog'

const DialogComponent = Vue.extend(Dialog)

const insertToArea = (el) => {
  document.body.appendChild(el)
}

const createDialog = (opts) => {
  const instance = new DialogComponent({
    mounted() {
      this.init(opts)
    },
  })
  instance.vm = instance.$mount()
  insertToArea(instance.vm.$el)
  return instance
}

const hooks = () => ({
  show(options) {
    return createDialog(options)
  },
})

Dialog.install = (vue) => {
  vue.component(Dialog.name, Dialog)
  vue.use({
    install: (vue) => (vue.prototype.$Dialog = hooks(vue)),
  })
}

export default Dialog
