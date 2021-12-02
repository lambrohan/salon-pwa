import { BaseEntity } from '..'

export class BaseService extends BaseEntity {
  name: string
  type: string
  is_combo: boolean
}
