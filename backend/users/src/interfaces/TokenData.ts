import { Role } from '@backend/roles'

export interface TokenData {
  id: number
  email: string
  role: Role
}
