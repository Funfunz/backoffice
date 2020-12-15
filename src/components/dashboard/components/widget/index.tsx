import React, { memo, FC } from 'react';
import classNames from 'classnames';
import style from './style.module.scss';

export interface IWidgetProps {
  full?: boolean,
  half?: boolean,
  children?: any
}

const Widget: FC<IWidgetProps> = ({
  full = false,
  half = false,
  children
}) => {
  const layoutClasses = classNames({
    [style.widgetContainer]: true,
    [style.span6]: full,
    [style.span3]: half,
    [style.span2]: !full && !half
  });
  return (
    <div className={layoutClasses}>
      {children}
    </div>
  );
};

export default memo(Widget);