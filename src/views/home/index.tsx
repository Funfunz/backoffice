import React, { FC, memo } from 'react';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import style from './style.module.scss';

export interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
  return (
    <div className={style.homeContainer}>
      <p>Please choose a table on the left menu to start</p>
      <Button
        prefix={<Icon name="exclamation" />}
        color="warning"
        label="Warning"
        onClick={() => undefined}
      />
      <p style={{ marginTop: 1000 }}>Bottom</p>
    </div>
  );
};

export default memo(Home);
