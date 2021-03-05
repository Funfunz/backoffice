import React, { FC, memo, useCallback, useState } from 'react'
import Select from 'react-select'
import { Input } from 'components/input'
import Button from 'components/button'
import type { InputEvent } from 'components/input'
import style from './style.module.scss'
import classNames from 'classnames'
import { useParams } from 'react-router-dom'
import useTableConfig from 'hooks/useTableConfig'
import type { IProperty } from 'services/table'

interface IParams {
  tableName: string
  id?: string
}

const Edit: FC<{}> = () => {
  const [entry, setEntry] = useState<Record<string, unknown>>({})

  const handleChangeInput = useCallback(
    (event: InputEvent) => {
      if (event.name) {
        entry[event.name] = event.value
        setEntry({...entry})
      }
    },
    [entry]
  )

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const params = useParams<IParams>()
  const { table } = useTableConfig(params.tableName)

  const isNew = !params.id

  let inputs: IProperty[][] = []

  table.properties.forEach(
    (entry, index) => {
      if (index % 2 === 0) {
        inputs.push([entry])
      } else {
        inputs[inputs.length - 1].push(entry)
      }
    }
  )

  return (
    <div className={style.editTable}>
      <div className={style.titlePage}>
        <h1>{isNew ? 'new page' : 'edit page'}</h1>
      </div>

      <div className={style.editTableContainer}>
        {inputs.map(
          (properties, index) => (
            <div key={index} className={style.columns + ' ' + style.columnsGap2}>
              {properties.map(
                (property, index) => (
                  <div key={index} className={classNames(style.column, style.col6)}>
                    {property.layout?.label || property.name}
                    <Input
                      name={property.name}
                      type={property.layout?.editField?.type || 'text'}
                      onChange={handleChangeInput}
                      value={entry[property.name]}
                    />
                  </div>
                )
              )}
            </div>
          )
        )}
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
              name="password"
              type="password"
              onChange={handleChangeInput}
              value={entry['password']}
            />
          </div>
          <div className={classNames(style.column, style.col6)}>
            INPUT TEXT
            <Input
              name="text"
              type="text"
              onChange={handleChangeInput}
              value={entry['text']}
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

        <div className={style.actions}>
          <Button
            prefix={<i className="fas fa-plus"></i>}
            label="CANCEL"
            color='cancel'
            className={style.actionButton}
          />
          <Button
            prefix={<i className="fas fa-save"></i>}
            label="SAVE"
            color='primary'
            className={style.actionButton}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(Edit)
