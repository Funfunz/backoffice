import { useCallback } from 'react'
import { runForceUpdate, useForceUpdate } from 'react-forceupdate'
import { login, getCurrentUser } from '../services/auth'

export function useAuth() {

  const user = getCurrentUser()

  useForceUpdate('login')

  const handleLogin = useCallback(() => {
    login().then(() => {
      runForceUpdate('login')
    })
  }, [])

  return { 
    isAuthenticated: !!user,
    user,
    login: handleLogin,
  }
}