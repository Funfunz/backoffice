import { FC, ComponentType } from 'react'
import { redirect } from 'react-router-dom'
import { isAuthenticated, isLoading } from 'services/auth'
import Message from 'components/Message'


export default function renderContent(Component?: ComponentType, render?: FC, redirected?: string): FC {
  return function(props) {
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
      redirect(`/login?redirect=${redirected}`)
      return (
        null
      )
    }
  }
}