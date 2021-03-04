import React, { FC, memo, useCallback } from 'react'
import Button from 'components/button'
import PageTitle from 'components/page-title'
import style from './style.module.scss'
import { useParams, useHistory } from 'react-router-dom'
import useTableConfig from 'hooks/useTableConfig'
import { useEntry } from 'hooks/useEntry'
import { useEntity } from 'hooks/useEntity'
import { Column, Row } from 'components/grid'

interface IParams {
  tableName: string
  id?: string
}

const Edit: FC<{}> = () => {

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

  const handleChange = useCallback(
    (name: string, value?: any) => {
      setEntry((entry) => ({ 
        ...entry,
        [name]: value
      }))
    },
    [setEntry]
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
            ({ Component, props }, index) =>
              <Column size={6} key={index}>
                <label className={style.inputLabel}>
                  {props.label}
                </label>
                <Component
                  {...props} 
                  onChange={handleChange}
                  value={entry[props.name] as string || ''}
                />
              </Column>
          )}
        </Row>

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
