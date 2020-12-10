import React, { FC, memo, useState } from 'react';
import Button from 'components/button';
import Icon from 'components/icon';
import style from './style.module.scss';
import { Input } from 'components/input';

export interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
  const [text, setText] = useState('');

  return (
    <div className={style.homeContainer}>
      <p>Please choose a table on the left menu to start</p>
      <Button
        prefix={<Icon name="exclamation" />}
        color="warning"
        label="Warning"
        onClick={() => undefined}
      />

      <Input
        type="select"
        onChange={() => false}
        value={'2'}
        options={[
          { value: '1', description: '1' },
          { value: '2', description: '2' },
        ]}
      />
      <Input
        type="radio"
        onChange={() => false}
        value={'2'}
        options={[
          { value: '1', description: '1' },
          { value: '2', description: '2' },
        ]}
      />
      <Input
        type="checkbox-group"
        onChange={() => false}
        value={'2'}
        options={[
          { value: '1', description: '1' },
          { value: '2', description: '2' },
        ]}
      />
      <Input type="checkbox"  onChange={() => false} name={'aaa'} value={true} />
      <Input type="switch" onChange={() => false} />
      <Input type="text"  onChange={() => false} value={text} prefix="cenas" suffix="cenas" />
      <p style={{ marginTop: 1000 }}>Bottom</p>
    </div>
  );
};

export default memo(Home);
