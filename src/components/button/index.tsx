import React, { memo, MouseEvent, FC } from 'react'
import classNames from 'classnames'

import classes from './style.module.scss'

export interface IButtonProps {
  disabled?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  label?: string | JSX.Element;
  prefix?: string | JSX.Element;
  suffix?: string | JSX.Element;
  color?: string;
  onClick?: (event: MouseEvent) => void;
  style?: any;
  submit?: boolean;
}

const Button: FC<IButtonProps> = ({
  disabled,
  prefix,
  label,
  suffix,
  rounded,
  outlined,
  color,
  onClick,
  style,
  children,
  submit,
}) => {
  const wrapperClasses = classNames({
    [classes.button]: true,
    [classes[color || '']]: color,
    [classes.rounded]: rounded,
    [classes.outlined]: outlined,
  })

  return (
    <button
      onClick={onClick}
      className={wrapperClasses}
      type={submit ? 'submit' : 'button'}
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
