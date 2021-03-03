import React, { FC, memo, useCallback, useState } from 'react'
import Select from 'react-select'
import { Input } from 'components/input'
import Button from 'components/button'
import PageTitle from 'components/page-title'
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

  const row = classNames(style.columns, style.columnsGap2) 
  const inputContainer = classNames(style.column, style.col6)

  return (
    <div className={style.editTable}>
      <div className={style.titlePage}>
        <PageTitle text={isNew ? 'new page' : 'edit page'}/>
      </div>

      <div className={style.editTableContainer}>
        {inputs.map(
          (properties, index) => (
            <div key={index} className={row}>
              {properties.map(
                (property, index) => (
                  <div key={index} className={inputContainer}>
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
