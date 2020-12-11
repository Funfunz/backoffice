import React, { memo, FC } from 'react';
import style from './style.module.scss';

export interface IDashboardProps {
  children?: any
}

const Dashboard: FC<IDashboardProps> = ({children}) => {
  return (
    <div className={style.dashboardContainer}>
      {children}
    </div>
  );
};

export default memo(Dashboard);