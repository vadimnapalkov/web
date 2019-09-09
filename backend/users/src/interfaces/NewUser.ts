export interface NewUser {
  id: null
  email: string
  password: string
  profile: { firstName: string; lastName: string }
  registeredAt: Date
  lastLogonAt: Date
}