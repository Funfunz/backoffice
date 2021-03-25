import React, { FC, ComponentType, useEffect } from 'react'
import { runForceUpdate, useForceUpdate } from 'react-forceupdate'
import { Route, useLocation } from 'react-router-dom'

import { getCurrentUser, isAuthenticated } from 'services/auth'
import renderContent from './renderContent'

export interface IPrivateRoute {
  component?: ComponentType<any>;
  render?: FC<any>;
  [key: string]: any;
}

const PrivateRouter: FC<IPrivateRoute> = ({
  component: Component,
  render: privateRender,
  ...rest
}) => {

  const location = useLocation()

  useForceUpdate('PrivateRoute')

  useEffect(() => {
    if (!isAuthenticated()) {
      getCurrentUser().catch(console.log).then(() => {
        runForceUpdate('PrivateRoute')
      })
    }
  }, [])

  return (
    <Route
      {...rest}
      render={renderContent(Component, privateRender, location.pathname)}
    />
  )
}

export default PrivateRouter
