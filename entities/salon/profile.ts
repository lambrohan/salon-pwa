import { SalonServiceStatus } from '~/utils/enums'
import { BaseEntity } from '..'
import { FileEntity } from '../FileEntity'

export class SalonProfile extends BaseEntity {
  address: string
  opening_time: string
  closing_time: string
  display_picture: FileEntity
  images: FileEntity[]
  latitude: number
  longitude: number
  service_status: SalonServiceStatus
  salon_id: string
  average_rating: number
  total_rating_count: number
  contact_number: string
  name: string
}
