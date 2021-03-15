import React, { FC } from 'react'

import classes from './style.module.scss'

export const Grid: FC = ({ children}) => {
  return (
    <div className={classes.row}>
      {children}
    </div>
  )
}

export { default as Column } from './Column'

