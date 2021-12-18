import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Chair, Salon } from '~/entities'

const resource = '/stylist'

export const StylistRepository = ($axios: NuxtAxiosInstance) => ({
  async verifyQR(payload: { token: string }) {
    return await $axios.$post(resource + '/verify-qr', payload)
  },

  async create(payload: { name: string }) {
    return await $axios.$post(resource, payload)
  },

  async updateProfilePicture(payload: any) {
    return await $axios.$put(resource + '/dp', payload)
  },
})
