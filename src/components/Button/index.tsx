import React, { memo, MouseEvent, FC, useCallback, ReactNode, MouseEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import classes from './style.module.scss'

export interface IButtonProps {
  active?: boolean
  disabled?: boolean
  rounded?: boolean
  label?: string | JSX.Element
  prefix?: string | JSX.Element
  suffix?: string | JSX.Element
  color?: string
  variant?: string
  onClick?: (event: MouseEvent) => void
  navigateTo?: string
  style?: any
  className?: string
  children?: ReactNode
}

const Button: FC<IButtonProps> = ({
  active = false,
  disabled,
  prefix,
  label,
  suffix,
  rounded,
  color,
  onClick,
  navigateTo,
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
      [classes.active]: active,
    }
  ])

  const history = useNavigate()

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    if (navigateTo) {
      history(navigateTo)
    } else if (onClick) {
      onClick(event)
    }
  }, [navigateTo, onClick, history])

  return (
    <button
      onClick={handleClick}
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
