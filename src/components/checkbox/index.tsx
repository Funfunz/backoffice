import React, { memo, FC } from 'react';

import classes from './style.module.scss';

export interface ICheckboxProps {
  disabled?: boolean;
  label?: string;
  checked?: boolean;
}

const CheckboxComponent: FC<ICheckboxProps> = ({
  disabled,
  label,
  checked,
  children
}) => {

  return (
    <label className={classes.container}>
      {label}
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
      >
      </input>
      <span className={classes.checkmark}></span>
      {children}
    </label>
  );
};

export const Checkbox = memo(CheckboxComponent);
