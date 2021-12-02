import { UserGender } from '~/utils/enums'
import { BaseEntity } from '..'
import { FileEntity } from '../FileEntity'

export class UserProfile extends BaseEntity {
  full_name: string
  birth_date: Date
  gender: UserGender
  profile_picture: FileEntity
}
