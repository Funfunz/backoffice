import React, { FC, memo, useState } from 'react'
import Select from 'react-select'
import { Input } from 'components/input'

import style from './style.module.scss'
import classNames from 'classnames'

const EditTable: FC<{}> = () => {
  const [text, setText] = useState('')

  const handleChangeTextInput = (event: any) => {
    setText(event.value)
  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <div className={style.editTable}>
      <div className={style.titlePage}>
        <h1>EDIT PAGE</h1>
      </div>

      <div className={style.editTableContainer}>
        <div className={style.columns}>
          <div className={classNames(style.column, style.col6)}>
            RADIO
            <Input
              type="radio"
              onChange={() => false}
              value={'2'}
              options={[
                { value: '1', description: '1' },
                { value: '2', description: '2' },
              ]}
            />
          </div>

          <div className={classNames(style.column, style.col6)}>
            CHECKBOX GROUP
            <Input
              type="checkbox-group"
              onChange={() => false}
              value={'2'}
              options={[
                { value: '1', description: '1' },
                { value: '2', description: '2' },
              ]}
            />
          </div>
        </div>
        <div className={style.columns}>
          <div className={classNames(style.column, style.col6)}>
            CHECKBOX
            <Input
              type="checkbox"
              onChange={() => false}
              name={'aaa'}
              value={true}
            />
          </div>

          <div className={classNames(style.column, style.col6)}>
            ACTIVE
            <Input type="switch" onChange={() => false} />
          </div>
        </div>

        <div className={style.columns}>
          <div className={classNames(style.column, style.col6)}>
            PASSWORD
            <Input
              type="password"
              onChange={handleChangeTextInput}
              value={text}
            />
          </div>
          <div className={classNames(style.column, style.col6)}>
            INPUT TEXT
            <Input
              type="text"
              onChange={handleChangeTextInput}
              value={text}
              prefix="prefix"
              suffix="suffix"
            />
          </div>
        </div>
        <div className={style.columns}>
          <div className={classNames(style.column, style.col6)}>
            SINGLE SELECT
            <Select options={options} />
          </div>
        </div>
        <div className={style.columns}>
          <div className={classNames(style.column, style.col6)}>
            MULTI SELECT
            <Select options={options} isMulti />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(EditTable)
