import React, { FC, memo } from 'react'
import style from './style.module.scss'

export interface ILogoutProps {};

const Logout: FC<ILogoutProps> = () => {
  return (
    <div className={style.logoutContainer}>
      Logout view
    </div>
  )
}

export default memo(Logout)