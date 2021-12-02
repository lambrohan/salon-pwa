export const state = () => ({
  authenticated: false,
  fireUser: false,
  user: false,
})

export const actions = {
  async nuxtServerInit(store, { req }) {
    console.log('serverinit')
    if (req.user) {
      store.commit('SET_AUTH', req.user)
    }
  },

  async onAuthStateChangedAction(store, user) {
    if (user && user.uid) {
      this.$Tawk.setAttributes({
        uid: user.uid,
        phone_number: user.phone_number,
      })
      store.commit('SET_AUTH', user)
    }
  },

  async getUser(store, uid) {
    const user = await this.$axios.$get(`/user/${uid}`)
    store.commit('SET_USER', user)
  },
}

export const mutations = {
  SET_AUTH(state, user) {
    state.fireUser = user
    state.authenticated = true
  },

  CLEAR_AUTH(state) {
    state.fireUser = false
    state.authenticated = false
    state.user = false
  },

  SET_USER(state, user) {
    state.user = user
  },
}

export const getters = {
  authUser(state) {
    return state.fireUser
  },

  getUser(state) {
    return state.user
  },
}
