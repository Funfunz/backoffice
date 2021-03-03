import React, { FC, memo, useCallback } from 'react'
//import Select from 'react-select'
import { Input } from 'components/input'
import Button from 'components/button'
import PageTitle from 'components/page-title'
import style from './style.module.scss'
//import classNames from 'classnames'
import { useParams, useHistory } from 'react-router-dom'
import useTableConfig from 'hooks/useTableConfig'
import { useEntry } from 'hooks/useEntry'
import { useEntity } from 'hooks/useEntity'
import type { IField } from 'utils/fields'
import type { InputEvent } from 'components/input'
import { Column, Row } from 'components/grid'

interface IParams {
  tableName: string
  id?: string
}

const Edit: FC<{}> = () => {
  /*const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]*/

  const params = useParams<IParams>()
  const history = useHistory()
  const { table } = useTableConfig(params.tableName)

  const isNew = !params.id

  const entity = useEntity(params.tableName)
  const {entry, setEntry, saveEntry } = useEntry(
    entity,
    params.id ? {
      [table.pkColumn().name]: params.id
    } : undefined
  )

  let inputs: IField[][] = []

  entity.fields.forEach(
    (entry, index) => {
      if (index % 2 === 0) {
        inputs.push([entry])
      } else {
        inputs[inputs.length - 1].push(entry)
      }
    }
  )

  const handleChangeInput = useCallback(
    (event: InputEvent) => {
      if (event.name) {
        entry[event.name] = event.value
        setEntry({...entry})
      }
    },
    [entry, setEntry]
  )

  const goBack = useCallback(
    async () => {
      history.goBack()
    },
    [history]
  )

  const save = useCallback(
    async () => {
      await saveEntry()
      console.log('entry saved')
      goBack()
    },
    [saveEntry, goBack]
  )

  return (
    <div className={style.editTable}>
      <div className={style.titlePage}>
        <PageTitle text={isNew ? 'new page' : 'edit page'}/>
      </div>

      <div className={style.editTableContainer}>
        <Row>
        {entity.fields.map(
          // TODO: match correct input component
          ({ /*component,*/ props }, index) =>
            <Column size={6} key={index}>
              <label className={style.inputLabel}>
                {props.label}
              </label>
              <Input
                {...props} 
                onChange={handleChangeInput}
                value={entry[props.name] as string || ''}
              />
            </Column>
        )}
        </Row>

        {/*<div className={row}>
          <div className={inputContainer}>
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

          <div className={inputContainer}>
            CHECKBOX
            <Input
              type="checkbox"
              onChange={() => false}
              name={'aaa'}
              value={true}
            />
          </div>
        </div>

        <div className={row}>
          <div className={inputContainer}>
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
          

          <div className={inputContainer}>
            ACTIVE
            <Input type="switch" onChange={() => false} />
          </div>
        </div>

        <div className={row}>
          <div className={inputContainer}>
            PASSWORD
            <Input
              name="password"
              type="password"
              onChange={handleChangeInput}
              value='asd'
            />
          </div>
          <div className={inputContainer}>
            INPUT TEXT
            <Input
              name="text"
              type="text"
              onChange={handleChangeInput}
              value='text'
              prefix="prefix"
              suffix="suffix"
            />
          </div>
        </div>
        <div className={row}>
          <div className={inputContainer}>
            SINGLE SELECT
            <Select options={options} />
          </div>
        </div>
        <div className={row}>
          <div className={inputContainer}>
            MULTI SELECT
            <Select options={options} isMulti />
          </div>
        </div>
        */}

        <div className={style.actions}>
          <Button
            onClick={goBack}
            prefix={<i className="fas fa-plus"></i>}
            label="CANCEL"
            color='cancel'
            className={style.actionButton}
          />
          <Button
            onClick={save}
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
