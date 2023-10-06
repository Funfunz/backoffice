import Message from 'components/Message'
import { FC, useEffect } from 'react'
import { redirect, useLocation } from 'react-router-dom'

import { getCurrentUser, isAuthenticated, isLoading } from 'services/auth'

export interface IPrivateRoute {
  Component?: FC
  lazy?: string
  [key: string]: any;
}

const PrivateRouter: FC<IPrivateRoute> = ({
  children
}) => {

  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated()) {
      getCurrentUser().catch(console.log)
    }
  }, [])

  console.log(isAuthenticated(), isLoading())
  if (isAuthenticated()) {
    return children
  } else if (isLoading()) {
    return (
      <Message loading />
    )
  } else {
    redirect(`/login?redirect=${location.pathname}`)
    return (
      null
    )
  }
}

export default PrivateRouter
