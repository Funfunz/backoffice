import React, { memo, MouseEvent, FC } from 'react';
import classNames from 'classnames';

import classes from './style.module.scss';

export interface IButtonProps {
  disabled?: boolean;
  rounded?: boolean;
  label?: string | JSX.Element;
  prefix?: string | JSX.Element;
  suffix?: string | JSX.Element;
  color?: 'danger' | 'warning' | 'info' | 'success' | 'delete';
  variant?: string;
  onClick: (event: MouseEvent) => void;
  style?: any;
}

const ButtonComponent: FC<IButtonProps> = ({
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
}) => {
  const wrapperClasses = classNames({
    [classes.button]: true,
    [classes[color || '']]: color,
    [classes.rounded]: rounded,
    [classes[variant || '']]: variant,
  });

  return (
    <button
      onClick={onClick}
      className={wrapperClasses}
      type="button"
      style={style}
      disabled={disabled}
    >
      {prefix ? <span className="prefix">{prefix}</span> : null}
      {label ? <span className="label"> {label} </span> : null}
      {suffix ? <span className="suffix">{suffix}</span> : null}
      {children}
    </button>
  );
};

export const Button = memo(ButtonComponent);
