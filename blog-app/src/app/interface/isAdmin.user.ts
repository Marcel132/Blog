import { IsAdmin } from './admin.interface'

// Here is the list of users that are admins
export const User: IsAdmin[] = [
  {
    email: 'test@test.com',
    // ! Password: '123456789'
    isAdmin: true
  }
]
