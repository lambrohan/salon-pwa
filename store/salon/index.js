import liteSalonQ from '@/apollo/queries/all-salons-lite.gql'
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
    const { data } = await this.$apollo.defaultClient.query({
      query: liteSalonQ,
      variables: {
        ownerId: store.rootState.user.id,
      },
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
