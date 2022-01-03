import jwtDecode from 'jwt-decode'
import { getAuthTokenFromReq } from '~/utils'

export const state = () => ({
  authenticated: false,
  fireUser: false,
  user: false,
  partnerProfile: false,
  isOpen: true,
})

export const actions = {
  async nuxtServerInit(store, { req, res }) {
    const token = getAuthTokenFromReq(req, res)
    if (token) {
      const user = jwtDecode(token)
      store.commit('SET_AUTH', user)
      const profile = await this.$axios.$get('/salon/partner-profile', {
        headers: {
          Authorization: 'bearer ' + token,
        },
      })
      store.commit('SET_PARTNER_PROFILE', profile)
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

  async getPartnerProfile(store) {
    return new Promise(async (resolve, reject) => {
      try {
        const profile = await this.$salonRepository.getPartnerProfile()
        this.$axios.setHeader('role', profile.role)
        store.commit('SET_PARTNER_PROFILE', profile)
        resolve(profile)
      } catch (error) {
        reject(error)
      }
    })
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

  SET_PARTNER_PROFILE(state, profile) {
    state.partnerProfile = profile
  },

  SET_VISIBILITY(state, payload) {
    state.isOpen = payload
  },
}

export const getters = {
  authUser(state) {
    return state.fireUser
  },

  getUser(state) {
    return state.user
  },

  userIsOwner(state) {
    return state.partnerProfile && state.partnerProfile.role === 'salon_owner'
  },

  userIsStylist(state) {
    return state.partnerProfile && state.partnerProfile.role === 'salon_stylist'
  },

  getSalonRole(state) {
    return state.partnerProfile && state.partnerProfile.role
  },

  getPartner(state) {
    return state.partnerProfile
  },

  isOpen(state) {
    return state.isOpen
  },
}
