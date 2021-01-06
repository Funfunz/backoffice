import React, { FC, memo, useCallback, useState } from 'react'
import { auth } from 'services'
import style from './style.module.scss'
import Button from 'components/button'

export interface ILoginProps {};

const ResetPassword: FC<ILoginProps> = memo(() => {
  const [username, setusername] = useState('')

  const submit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      auth.resetPassword(username)
    },
    [username]
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setusername(event.currentTarget.value)
    },
    []
  )
  return (
    <>
      <h1 className={style.title}>
        Reset password
      </h1>
      <form onSubmit={
        submit
      }>
        <div>
          <label htmlFor='username' className={style.label}>Username/email:</label>
          <input id='username' name='username' className={style.input} value={username} onChange={handleInputChange}/>
        </div>
        <div className={style.actions}>
          <Button rounded={true} color='primary' label='Reset' submit={true}/>
        </div>
      </form>
    </>
  )
})

export { ResetPassword }
