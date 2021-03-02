import React, { FC, memo, useState } from 'react'
import { TEntry } from 'reducers/entry'
import ActionButton, { EActionType, IActionFunction } from '../action-button'
import Checkbox from '../../../checkbox'
import style from './style.module.scss'

export interface ITableRowProps {
  fields: string[];
  data: TEntry;
  actions?: {
    [key in EActionType]?: IActionFunction;
  };
}

const TableRow: FC<ITableRowProps> = ({ fields, data, actions }) => {
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
              className={style.button}
            />
          ))}
          <div className={style.mobileOptions}>
            <div className={style.moreContainer}>
              <button className={`${style.button} ${style.more}`} onClick={() => toggleShow()}><i className="fas fa-2x fa-ellipsis-v"></i></button>
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
                  className={style.button}
                />
          ))}
              </div>
            }
          </div>
        </td>
      )}
    </tr>
  )
}

export default memo(TableRow)
