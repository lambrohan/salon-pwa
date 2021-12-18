import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { Chair, Salon } from '~/entities'

const resource = '/salon'
const profileRes = '/salon-profile'
const serviceRes = '/salon-service'

export const SalonRepository = ($axios: NuxtAxiosInstance) => ({
  async create(payload: { name: string }): Promise<Chair> {
    return await $axios.$post(resource, payload)
  },

  async getOwned() {
    return await $axios.$get(resource)
  },

  async getById(salonId: string) {
    return await $axios.$get(`${resource}/${salonId}`)
  },

  async toggleStatus(salonId: string) {
    return await $axios.$put(profileRes + '/toggle-status/' + salonId)
  },

  async getKyc(salonId: string) {
    return await $axios.$get(`${resource}/kyc/${salonId}`)
  },

  async setDisplayPic(fileId: string, salonId: string) {
    return await $axios.$post(profileRes + '/default_picture', {
      fileId,
      salonId,
    })
  },

  async addImage(salonId: string, payload: any) {
    return await $axios.$post(profileRes + '/images/' + salonId, payload)
  },

  async deleteImage(fileId: string, salonId: string) {
    return await $axios.$delete(profileRes + '/images', {
      data: {
        fileId,
        salonId,
      },
    })
  },

  async fetchServices(salonId: string, q: string) {
    if (q == '') q = 'all'
    return await $axios.$get(serviceRes + '/salon/' + salonId + '/' + q)
  },

  async updatePrice(salon_service: string, price: number) {
    return await $axios.$post(serviceRes + '/price', { price, salon_service })
  },

  async getPartnerProfile() {
    return await $axios.$get(resource + '/partner-profile')
  },

  async disableService(id: string) {
    return await $axios.$get(serviceRes + '/toggle-state/' + id)
  },
})
