import { Role } from '@backend/roles'

export interface NewUser {
  email: string
  password: string
  profile: { firstName: string; lastName: string }
  registeredAt: Date
  lastLoginAt: Date
  role: Role
}
