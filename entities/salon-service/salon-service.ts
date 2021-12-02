import { BaseEntity } from '..'
import { BaseService } from './base-service'

export class SalonService extends BaseEntity {
  salon_id: string
  base_service: BaseService
  base_service_id: string
  disabled: boolean

  effective_price: SalonService
  popularity: number
}
