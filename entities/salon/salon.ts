import { BaseEntity } from '..'
import { Chair } from '../chair'
import { SalonService } from '../salon-service'
import { SalonProfile } from './profile'

export class Salon extends BaseEntity {
  is_published: boolean
  disabled: boolean
  owner_id: string
  profile: SalonProfile

  chairs: Chair[]

  services: SalonService[]
}
