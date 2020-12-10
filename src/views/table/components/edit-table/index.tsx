import { Input } from 'components/input';
import React, { FC, memo, useState } from 'react';

const EditTable: FC<{}> = () => {
  const [text, setText] = useState('');
  
  return (
    <div>
        EDIT PAGE
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
      <Input type="checkbox" onChange={() => false} name={'aaa'} value={true} />
      <Input type="switch" onChange={() => false} />
      <Input
        type="text"
        onChange={() => false}
        value={text}
        prefix="cenas"
        suffix="cenas"
      />
    </div>
  );
};

export default memo(EditTable);
