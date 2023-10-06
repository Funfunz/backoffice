import React, { FC } from 'react'

import classes from './style.module.scss'

type Props = {
  children: React.ReactNode;
}

export const Grid: FC<Props> = ({ children }) => {
  return (
    <div className={classes.row}>
      {children}
    </div>
  )
}

export { default as Column } from './Column'

