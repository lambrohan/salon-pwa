export const state = () => ({
  authenticated: false,
  fireUser: false,
})

export const actions = {
  async nuxtServerInit(store, { req, beforeNuxtRender }) {
    console.log('serverinit')
    if (req.user) {
      store.commit('SET_AUTH', req.user)
    }
  },

  async onAuthStateChangedAction(store, user) {
    if (user && user.id) {
      store.commit('SET_AUTH', user)
    }
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
  },
}

export const getters = {
  authUser(state) {
    return state.fireUser
  },
}
