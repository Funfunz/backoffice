import React, { memo, FC } from 'react'
import Widget from './../widget'
import style from './style.module.scss'

export interface IQuickActionsProps {}

const QuickActions: FC<IQuickActionsProps> = () => {
  return (
    <Widget>
      <div className={style.quickActionsContainer}>
        <p className={style.title}>Quick Actions</p>
      </div>
    </Widget>
  )
}

export default memo(QuickActions)