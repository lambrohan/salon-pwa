import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Chair, Salon } from '~/entities'

const resource = '/chair'

export const ChairRepository = ($axios: NuxtAxiosInstance) => ({
  async create(payload: { salon: string }): Promise<Chair> {
    return await $axios.$post(resource, payload)
  },

  async getQRToken(chairId: string) {
    return await $axios.$get(`${resource}/gen-qr/${chairId}`)
  },

  async validateChair(chairId: string) {
    return await $axios.$post(`${resource}/validate/${chairId}`)
  },

  async getWithSalonId(salonId: string): Promise<Chair[]> {
    return await $axios.$get(`${resource}/salon/${salonId}`)
  },

  async getById(chairId: string) {
    return await $axios.$get(resource + '/' + chairId)
  },

  async toggle(chairId: string) {
    return await $axios.$post(resource + '/toggle/' + chairId)
  },
})
