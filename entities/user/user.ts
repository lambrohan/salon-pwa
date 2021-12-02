import { UserProfile } from '@firebase/auth'
import { BaseEntity } from '..'

export class User extends BaseEntity {
  uid: string
  phone_number: string
  email: string
  profile: UserProfile
  roles: string[]
  disabled: boolean
}
