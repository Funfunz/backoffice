import React, { FC, memo } from 'react'
import style from './style.module.scss'

export interface ILoginProps {};

const Login: FC<ILoginProps> = () => {
  return (
    <div className={style.loginContainer}>
      Login view
    </div>
  )
}

export default memo(Login)