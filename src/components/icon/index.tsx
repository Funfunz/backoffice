import React, { FC, memo } from 'react';
import classNames from 'classnames';

export interface IIconProps {
  name: string,
  fixedWidth?: boolean,
};

const Icon: FC<IIconProps> = ({ name, fixedWidth = true }) => {
  const iconClasses = classNames({
    'fas': true,
    [`fa-${name}`]: name,
    'fa-fw': fixedWidth,
  })

  return (
    <i className={iconClasses}></i>
  )
};

export default memo(Icon);