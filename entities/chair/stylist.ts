import { BaseEntity } from '..'
import { FileEntity } from '../FileEntity'

export class Stylist extends BaseEntity {
  display_name: string
  display_picture: FileEntity
  user_id: string
  chair_id: string
}
