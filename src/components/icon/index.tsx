import React, { FC, memo } from 'react';
import classNames from 'classnames';

export interface IIconProps {
  name: string,
  fixedWidth?: boolean,
};

const IconComponent: FC<IIconProps> = ({ name, fixedWidth = true }) => {
  const iconClasses = classNames({
    'fas': true,
    [`fa-${name}`]: name,
    'fa-fw': fixedWidth,
  })

  return (
    <i className={iconClasses}></i>
  )
};

export const Icon = memo(IconComponent);