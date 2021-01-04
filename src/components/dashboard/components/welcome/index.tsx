import React, { useState, FC, memo } from 'react'
import { NavLink } from 'react-router-dom'
import Widget from './../widget'
import style from './style.module.scss'
import Icon from 'components/icon'

export interface IWelcomeProps {}

const Welcome: FC<IWelcomeProps> = () => {

  const [isDismissed, setIsDismiss] = useState(localStorage.getItem('dismiss-welcome-widget') === 'true' || false) 

  if (isDismissed) {
    return null
  }

  const handleOnDismissClick = () => {
    localStorage.setItem('dismiss-welcome-widget', 'true')
    setIsDismiss(true)
  }

  return (
    <Widget full>
      <div className={style.welcomeContainer}>
        <div className={style.mainContainer}>
          <p className={style.title}>Welcome to Funfunz</p>
          <p className={style.subTitle}>We've assembled some links to help you get started.</p>
        </div>

        <div className={style.linksContainer}>
          <p className={style.firstSteps}>First steps</p>
          <ul className={style.linksList}>
            <NavLink to={`/todo/`}>
              View Families
            </NavLink>
            <NavLink to={`/todo/`}>
              Add new item
            </NavLink>
            <NavLink to={`/todo/`}>
              Edit item
            </NavLink>
          </ul>
        </div>

        <div className={style.dismissContainer}>
          <button className={style.dismissButton} onClick={handleOnDismissClick}> 
            <Icon name="times" />
            Dismiss
          </button>
        </div>
        
      </div>
    </Widget>
  )
}

export default memo(Welcome)