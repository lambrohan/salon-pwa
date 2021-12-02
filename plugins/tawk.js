const Tawk = (store) => {
  return {
    init: function () {
      let Tawk_API = {}
      let s1 = document.createElement('script')
      let s0 = document.getElementsByTagName('script')[0]
      s1.async = true
      s1.src = 'https://embed.tawk.to/61a47ce29099530957f713e9/1fll8flt6'
      s1.charset = 'UTF-8'
      s1.setAttribute('crossorigin', '*')
      s0.parentNode.insertBefore(s1, s0)
      window.Tawk_API = Tawk_API

      window.Tawk_API.onChatMinimized = function () {
        //place your code here
        window.Tawk_API.hideWidget()
      }

      return this
    },

    setAttributes: function (payload) {
      if (!payload) return
      if (window.Tawk_API.onLoaded) {
        window.Tawk_API.setAttributes(payload, function (error) {
          console.log(error)
        })
      } else {
        window.Tawk_API.onLoad = () => {
          window.Tawk_API.setAttributes(payload, function (error) {
            console.log(error)
          })
        }
      }

      return this
    },

    show: function () {
      window.Tawk_API.showWidget()
      window.Tawk_API.toggle()
      return this
    },

    hide: function () {
      window.Tawk_API.onLoad = function () {
        window.Tawk_API.hideWidget()
      }
      return this
    },

    popup: function (attrs) {
      window.Tawk_API.popup()
      if (attrs) {
        window.Tawk_API.setAttributes(attrs)
      }
    },
  }
}

export default (ctx, inject) => {
  const t = Tawk(ctx.store)
  inject('Tawk', t)
  ctx.$Tawk = t
  ctx.$Tawk.init().hide()
}
