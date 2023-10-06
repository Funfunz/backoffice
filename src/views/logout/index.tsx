import Message from 'components/Message'
import { FC, memo, useEffect } from 'react'

import { logout, isAuthenticated } from 'services/auth'

import style from '../login/style.module.scss'

export interface ILogoutProps {};

const Logout: FC<ILogoutProps> = () => {

  useEffect(() => {
    logout()
  }, )

  return (
    <div className={style.loginContainer}>
      {isAuthenticated()
        ? <Message loading />
        : null
      }
    </div>
    
  )
}

export default memo(Logout)