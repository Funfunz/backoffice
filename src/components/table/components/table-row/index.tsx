import React, { FC, memo, useState } from 'react';
import { TEntry } from 'reducers/entry';
import { ActionButton, EActionType, IActionFunction } from 'components/table/components/action-button';
import { Checkbox } from 'components/checkbox';
import style from './style.module.scss';

export interface ITableRowProps {
  fields: string[];
  data: TEntry;
  actions?: {
    [key in EActionType]?: IActionFunction;
  };
}

const TableRowComponent: FC<ITableRowProps> = ({ fields, data, actions }) => {
  const [showOptions, setShowOptions] = useState(false)
  const toggleShow = () =>{
    setShowOptions(!showOptions)
  }
  return (
    <tr>
      <td>
        <Checkbox/>
      </td>
      {fields.map((field, index) => (
        <td key={index}>{data[field]}</td>
      ))}
      {actions && (
        <td className={style.actions}>
          {(Object.keys(actions) as Array<EActionType>).map((type, index) => (
            <ActionButton
              key={index}
              data={data}
              type={type}
              onClick={actions[type]}
            />
          ))}
          <div className={style.mobileOptions}>
            <div className={style.moreContainer}>
              <button onClick={() => toggleShow()} className={style.more}><i className="fas fa-2x fa-ellipsis-v"></i></button>
            </div>
            {showOptions &&
              <div className={style.rowOptions}>
                {(Object.keys(actions) as Array<EActionType>).map((type, index) => (
                <ActionButton
                  key={index}
                  data={data}
                  type={type}
                  onClick={actions[type]}
                  label={type}
                />
          ))}
              </div>
            }
          </div>
        </td>
      )}
    </tr>
  );
};

export const TableRow = memo(TableRowComponent);
