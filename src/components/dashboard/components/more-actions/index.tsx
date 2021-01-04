import React, { memo, FC } from 'react'
import { NavLink } from 'react-router-dom'
import Widget from './../widget'
import style from './style.module.scss'

export interface IMoreActionsProps {}

const MoreActions: FC<IMoreActionsProps> = () => {
  return (
    <Widget>
      <div className={style.moreActionsContainer}>
        <p className={style.title}>More Actions</p>
        <NavLink className={style.link} to={`/todo/`}>
          More Actions
        </NavLink>
      </div>
    </Widget>
  )
}

export default memo(MoreActions)
