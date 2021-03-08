import React, { FC, ComponentType } from 'react'
import { Route, useLocation } from 'react-router-dom'
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

  return (
    <Route
      {...rest}
      render={renderContent(Component, privateRender, location.pathname)}
    />
  )
}

export default PrivateRouter
