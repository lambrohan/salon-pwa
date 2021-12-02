import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'
import { User } from '~/entities/user'

const resource = '/user'

export const UserRepository = ($axios: NuxtAxiosInstance) => ({
  async findOrCreate(): Promise<AxiosResponse<User, any>> {
    return await $axios.$post(resource)
  },

  async getByUid() {},
})
