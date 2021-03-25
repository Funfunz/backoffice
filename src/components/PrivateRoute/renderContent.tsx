import React, { FC, ComponentType } from 'react'
import { Redirect, RouteProps } from 'react-router-dom'
import { isAuthenticated, isLoading } from 'services/auth'
import Message from 'components/Message'


export default function renderContent<T extends RouteProps = RouteProps>(Component?: ComponentType<T>, render?: FC<T>, redirect?: string) {
  return function(props: T) {
    if (isAuthenticated()) {
      if (Component) {
        return (
          <Component {...props} />
        )
      } else if (render) {
        return (
          render(props)
        )
      } else {
        return null
      }
    } else if (isLoading()) {
      return (
        <Message loading />
      )
    } else {
      const to = {
        pathname: '/login',
        search: `?redirect=${redirect}`,
      }
      return (
        <Redirect to={to} />
      )
    }
  }
}