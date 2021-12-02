import { Plugin } from '@nuxt/types'
import { ChairRepository } from '~/api'
import { SalonRepository } from '~/api/salon'
import { StylistRepository } from '~/api/stylist'
import { UserRepository } from '~/api/user'

const repoPlugin: Plugin = (ctx: any, inject: any) => {
  // dependency injection
  inject('chairRepository', ChairRepository(ctx.$axios))
  inject('salonRepository', SalonRepository(ctx.$axios))

  inject('userRepository', UserRepository(ctx.$axios))
  inject('stylistRepository', StylistRepository(ctx.$axios))
}
export default repoPlugin
