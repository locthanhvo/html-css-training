import { STATUS } from '@constants'

export type StatusType = STATUS

export interface User {
  id: string
  firstName: string
  lastName: string
  avatar: string
  email: string
  createdAt: string
  status: STATUS
  password: string
  confirmPassword: string
  username: string
  phone: string
}

export type UserRequest = Omit<User, 'id'>
export type UserField = Record<keyof User, string>
