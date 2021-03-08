import React, { FC, ReactNode, memo } from 'react'
import classNames from 'classnames'
import style from './style.module.scss'

export interface ILoadingProps {
  children?: ReactNode
  className?: string
}

const Loading: FC<ILoadingProps> = ({ children = null, className = '' }) => {
  const loadingClasses = classNames({
    [style.loadingContainer]: true,
    [className]: className,
  })
  return (
    <div className={loadingClasses}>
      {children}
      Loading...
    </div>
  )
}

export default memo(Loading)
