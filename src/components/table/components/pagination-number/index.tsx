import React, { FC, memo } from 'react'
import style from './style.module.scss'
import classNames from 'classnames'


export interface IPaginationNumberProps {
  index: number
  currentPage?: number
  isClickable?: boolean
  onChangePage?: (index: number) => void
}

const PaginationNumber: FC<IPaginationNumberProps> = ({
  index,
  currentPage,
  isClickable = false,
  onChangePage
}) => {

  const handleClick = (index: number) => {
    if (onChangePage) {
      onChangePage(index)
    }
  }

  const itemWrapperClasses = classNames({
    [style.item]: true,
    [style.clickable]: isClickable,
    [style.active] : index === currentPage
  })

  return (
    <div
      className={itemWrapperClasses}
      onClick={() => handleClick(index)}
    >
      {isClickable ? index + 1 : '...' }
</div>
 )
}

export default memo(PaginationNumber)