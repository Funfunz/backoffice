import React, { FC } from 'react'

import classes from './style.module.scss'

export const Table: FC = ({ children }) => {
  return (
    <table className={classes.table}>
      {children}
    </table>
  )
}

export { default as TableBody } from './TableBody'
export { default as TableHead } from './TableHead'
export { default as TableRow } from './TableRow'
