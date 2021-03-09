import React, { FC, memo } from 'react'
import style from './style.module.scss'
import classNames from 'classnames'


export interface IPageItemProps {
  isClickable?: boolean
  active?: boolean
  onClick?: () => void
  children: React.ReactNode
}

const PageItem: FC<IPageItemProps> = ({
  isClickable = true,
  active = false,
  onClick,
  children
}) => {

  const itemWrapperClasses = classNames({
    [style.pageItem]: true,
    [style.clickable]: isClickable,
    [style.active]: active
  })

  return (
    <div className={itemWrapperClasses} onClick={onClick}>
      {children}
    </div>
 )
}

export default memo(PageItem)