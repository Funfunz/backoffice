import React, { memo, FC } from 'react'
import classNames from 'classnames'

import classes from './style.module.scss'

type IColumnSize = 1|2|3|4|5|6|7|8|9|10|11|12

export interface IColumnProps {
  size?: IColumnSize
  sizeSm?: IColumnSize
  sizeMd?: IColumnSize
  sizeLg?: IColumnSize
  sizeXl?: IColumnSize
}

export const Column: FC<IColumnProps> = memo(({ size, sizeSm, sizeMd, sizeLg, sizeXl, children }) => {
  
  const wrapperClasses = classNames({
    [classes[`col-${size}`]]: !!size,
    [classes[`col-sm-${sizeSm}`]]: !!sizeSm,
    [classes[`col-md-${sizeMd}`]]: !!sizeMd,
    [classes[`col-lg-${sizeLg}`]]: !!sizeLg,
    [classes[`col-xl-${sizeXl}`]]: !!sizeXl,
  })

  return (
    <div className={wrapperClasses}>
      {children}
    </div>
  )
})

export const Row: FC = memo(({ children}) => {
  return (
    <div className={classes.row}>
      {children}
    </div>
  )
})
