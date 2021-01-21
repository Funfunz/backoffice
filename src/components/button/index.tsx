import React, { memo, MouseEvent, FC } from 'react'
import classNames from 'classnames'

import classes from './style.module.scss'

export interface IButtonProps {
  disabled?: boolean
  rounded?: boolean
  label?: string | JSX.Element
  prefix?: string | JSX.Element
  suffix?: string | JSX.Element
  color?: string
  variant?: string
  onClick?: (event: MouseEvent) => void
  style?: any
  className?: string
}

const Button: FC<IButtonProps> = ({
  disabled,
  prefix,
  label,
  suffix,
  rounded,
  color,
  variant,
  onClick,
  style,
  children,
  className
}) => {
  const wrapperClasses = classNames([
    classes.button,
    className,
    {
      [classes[color || '']]: color,
      [classes.rounded]: rounded,
    }
  ])

  return (
    <button
      onClick={onClick}
      className={wrapperClasses}
      type="button"
      style={style}
      disabled={disabled}
    >
      {prefix ? <span className={classes.prefix}>{prefix}</span> : null}
      {label ? <span className="label"> {label} </span> : null}
      {suffix ? <span className={classes.suffix}>{suffix}</span> : null}
      {children}
    </button>
  )
}

export default memo(Button)
