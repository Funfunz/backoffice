import React, { FC, memo, useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser, IUser } from "services/auth"
import style from './style.module.scss'

const TopMenu: FC = () => {
  const [user, setUser] = useState<IUser>()
  const [showOptions, setShowOptions] = useState(false)

  const toggleShow = useCallback(() =>{
    setShowOptions(!showOptions)
  }, [showOptions])

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])


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
          <Link to="/logout">
            <span>logout</span>
            <i className="fas fa-power-off"></i>
          </Link>
        </div>
      }
    </nav>      
  )
}

export default memo(TopMenu)