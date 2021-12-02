import { Stylist } from '.'
import { BaseEntity } from '..'
import { Salon } from '../salon'
import { User } from '../user'

export class Chair extends BaseEntity {
  disabled: boolean

  salon: Salon

  owner: User

  owner_id: string

  stylist: Stylist

  stylist_id: string

  waiting_count: number
}
