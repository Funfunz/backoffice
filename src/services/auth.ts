import { API_ADDRESS } from 'constants/api'
import graphql from 'services/graphql'

export interface IUser {
  id: number | string
  email?: string
}

let user: IUser | undefined | null
let loading: boolean

export function isAuthenticated() {
  return user ? true : false
}

export function isLoading() {
  return loading === undefined ? true : loading
}

export async function getCurrentUser() {
  while(loading) {
    await new Promise((resolve) => setTimeout(resolve))
  }
  if (user === undefined) {
    loading = true
    try {
      // TODO: remove this hardcoded user and let graphql query real user
      user = await new Promise((cb) => setTimeout(() => cb({ id: 1, email: 'joaogsleite@gmail.com' }), 1000)) || await graphql.query({
        operation: 'me',
        fields: ['id']
      }) 
    } finally {
      if (!user) {
        user = null // no user returned from graphql
      }
      loading = false
    }
  }
  if (user === null) {
    throw new Error('No login')
  }
  return user
}

export async function login() {
  window.location.href = `${API_ADDRESS}/login/oauth`
}

export async function logout() {
  user = undefined
  await graphql.mutation({
    operation: 'logout'
  })
}
