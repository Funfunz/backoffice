import Message from 'components/Message'
import React, { FC, memo, useEffect } from 'react'
import { runForceUpdate, useForceUpdate } from 'react-forceupdate'
import { Redirect } from 'react-router-dom'

import { logout, isAuthenticated } from 'services/auth'

import style from '../login/style.module.scss'

export interface ILogoutProps {};

const Logout: FC<ILogoutProps> = () => {

  useForceUpdate('Logout')

  useEffect(() => {
    logout().then(() => {
      runForceUpdate('Logout')
    })
  }, )

  return (
    <div className={style.loginContainer}>
      {isAuthenticated()
        ? <Message loading />
        : <Redirect to="/" />
      }
    </div>
    
  )
}

export default memo(Logout)