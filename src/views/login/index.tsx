import { useCallback } from 'react'

import Button from 'components/Button'
import PageTitle from 'components/PageTitle'

import { login } from 'services/auth'

import style from './style.module.scss'

export interface ILoginProps {};

export const Component = () => {
  const handleClick = useCallback(() => {
    login()
  }, [])
  return (
    <div className={style.loginContainer}>
      <PageTitle text="Login" />
      <Button
        color="primary"
        onClick={handleClick}
        label="Login"
      />
    </div>
  )
}

Component.displayName = "Login"
