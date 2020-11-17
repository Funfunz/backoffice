import { IUser } from "./user"
import mock from "../mock"

const USER: IUser = {
  id: 1,
  name: 'João Leite',
  username: 'joaoleite',
}

mock('GET', '/users/me', async () => {
  return USER
})

mock('POST', '/auth/local', async () => {
  return USER
})

mock('POST', '/logout', async () => {
  return {}
})