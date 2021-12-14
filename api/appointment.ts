import { NuxtAxiosInstance } from '@nuxtjs/axios'
const resource = '/salon-appointment'
export const AppointmentRepository = ($axios: NuxtAxiosInstance) => ({
  async createWalkin(
    salon: string,
    chair: string,
    services: string[],
    phone_number: string
  ) {
    return await $axios.$post(resource + '/walkin', {
      phone_number,
      salon,
      chair,
      services,
    })
  },

  async startAppointment(id: string, duration: number) {
    return $axios.$put(resource + '/start/' + id, { approx_duration: duration })
  },

  async addServices(id: string, services: string[]) {
    return await $axios.$put(resource + '/addon/' + id, { services })
  },

  async updateDuration(id: string, duration: number) {
    return await $axios.$put(resource + '/approx-duration/' + id, {
      approx_duration: duration,
    })
  },

  async finish(id: string) {
    return await $axios.$put(resource + '/finish/' + id)
  },

  async notify(id: string, message: string) {
    return await $axios.$post(resource + '/notify/' + id, { message })
  },

  async cancel(id: string, reason: string) {
    return await $axios.$post(resource + '/cancel/' + id, { reason })
  },
})
