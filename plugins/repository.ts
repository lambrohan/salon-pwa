import { Plugin } from '@nuxt/types'
import {
  ChairRepository,
  SalonRepository,
  UserRepository,
  StylistRepository,
  AppointmentRepository,
} from '~/api'

const repoPlugin: Plugin = (ctx: any, inject: any) => {
  // dependency injection
  inject('chairRepository', ChairRepository(ctx.$axios))
  inject('salonRepository', SalonRepository(ctx.$axios))

  inject('userRepository', UserRepository(ctx.$axios))
  inject('stylistRepository', StylistRepository(ctx.$axios))
  inject('appointmentRepo', AppointmentRepository(ctx.$axios))
}
export default repoPlugin
