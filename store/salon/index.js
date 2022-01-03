import liteSalonQ from '@/apollo/queries/all-salons-lite.gql'
import getById from '@/apollo/queries/salon-by-id.gql'
import { SalonRoles } from '~/utils'
export const state = () => ({
  lite_salons: [],
})

export const getters = {
  getLiteSalons(state) {
    return state.lite_salons
  },
}

export const actions = {
  async fetchLiteSalons(store) {
    if (!store.rootState.user) return
    if (
      store.rootState.partnerProfile &&
      store.rootState.partnerProfile.role == SalonRoles.STYLIST
    ) {
      store.dispatch('fetchSalon')
      return
    }
    const { data } = await this.$apollo.defaultClient.query({
      query: liteSalonQ,
      variables: {
        ownerId: store.rootState.user.id,
      },
      fetchPolicy: 'no-cache',
    })
    if (data.lite_salons) {
      store.commit('SET_LITE_SALONS', data.lite_salons)
    }
  },

  async fetchSalon(store) {
    const { data } = await this.$apollo.defaultClient.query({
      query: getById,
      variables: {
        id: store.rootState.partnerProfile.salon,
      },
      fetchPolicy: 'no-cache',
    })
    if (data.lite_salons) {
      store.commit('SET_LITE_SALONS', data.lite_salons)
    }
  },
}

export const mutations = {
  SET_LITE_SALONS(state, payload) {
    state.lite_salons = payload
  },
}
