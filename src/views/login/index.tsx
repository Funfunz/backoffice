import React, { FC, memo, useCallback, useState } from 'react'
import { Login } from './login'
import { ResetPassword } from './resetPassword'
import style from './style.module.scss'

export interface ILoginProps {};

const LoginView: FC<ILoginProps> = memo(() => {
  const [showResetPassword, setShowResetPassword] = useState(false)
  const handleClickViewSwitcher = useCallback(
    () => {
      setShowResetPassword(!showResetPassword)
    },
    [showResetPassword]
  )

  return (
    <section className={style.loginContainer}>
      <div className={style.loginCenter}>
        {(showResetPassword && <ResetPassword/>) || <Login/>}
        <p className={style.viewSwitcher} onClick={handleClickViewSwitcher}>{(showResetPassword && 'Back') || 'Reset password'}</p>
      </div>
    </section>
  )
})

export default LoginView
