import useUser from "hooks/useUser"
import React, { FC, memo, useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import { auth } from 'services'
import style from './style.module.scss'

const TopMenu: FC = () => {
  const [showOptions, setShowOptions] = useState(false)
  const history = useHistory()
  const user = useUser()
  const toggleShow = useCallback(() =>{
    setShowOptions(!showOptions)
  }, [showOptions])
  const logout = useCallback(
    () => {
      auth.logout()
      history.push('/login')
    }, [history]
  )

  return (
    <nav className={style.topMenu} role="navigation" aria-label="main navigation">
      <div className={style.account} onClick={() => toggleShow()}>
        <span>{user?.email}</span>
        {showOptions ?
          <i className="fas fa-chevron-right"></i>
          :
          <i className="fas fa-chevron-down"></i>
        }
      </div>      
      {showOptions &&
        <div className={style.accountOptions}>
          <div className={style.logoutLink} onClick={logout}>
            <span>logout</span>
            <i className="fas fa-power-off"></i>
          </div>
        </div>
      }
    </nav>      
  )
}

export default memo(TopMenu)