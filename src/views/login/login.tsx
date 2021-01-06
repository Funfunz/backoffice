import React, { FC, memo, useCallback, useState } from 'react'
import { auth } from 'services'
import style from './style.module.scss'
import Button from 'components/button'
import { useHistory } from 'react-router-dom'

export interface ILoginProps {};

const Login: FC<ILoginProps> = memo(() => {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const history = useHistory()
  const submit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      auth.login(username, password).then(
        () => {
          const seachParams = new URLSearchParams(history.location.search)
          const redirect = seachParams.get('redirect')
          history.push(redirect || '/')
        }
      )
    },
    [username, password, history]
  )

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputSets: {
        [key: string]: React.Dispatch<React.SetStateAction<string>>
      } = {
        setusername,
        setpassword
      }
      inputSets[`set${event.currentTarget.name}`](event.currentTarget.value)
    },
    []
  )
  return (
    <>
      <h1 className={style.title}>
        Login
      </h1>
      <form onSubmit={
        submit
      }>
        <div>
          <label htmlFor='username' className={style.label}>Username/email:</label>
          <input id='username' name='username' className={style.input} value={username} onChange={handleInputChange}/>
        </div>
        <div>
          <label htmlFor='password' className={style.label}>Password:</label>
          <input id='password' name='password' type='password' className={style.input} value={password} onChange={handleInputChange}/>
        </div>
        <div className={style.actions}>
          <Button rounded={true} color='primary' label='Login' submit={true}/>
          {/*
            <Button rounded={true} color='primary' outlined={true} label='Create account' onClick={() => {console.log('create')}}/>
          */}
        </div>
      </form>
    </>
  )
})

export { Login }
