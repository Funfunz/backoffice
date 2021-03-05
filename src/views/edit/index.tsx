import React, { FC, memo, useCallback } from 'react'
import Button from 'components/button'
import PageTitle from 'components/page-title'
import style from './style.module.scss'
import { useParams, useHistory } from 'react-router-dom'
import { useEntry } from 'hooks/useEntry'
import { useEntity } from 'hooks/useEntity'
import { Column, Row } from 'components/grid'
import { mapFieldComponents } from 'utils/fields'

interface IParams {
  tableName: string
  id?: string
}

const Edit: FC<{}> = () => {

  const params = useParams<IParams>()
  const history = useHistory()

  const isNew = !params.id

  const entity = useEntity(params.tableName)
  const {entry, setEntry, saveEntry } = useEntry(entity, params.id)

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
      history.push({
        pathname: `/table/${params.tableName}`,
        state: { reload: true } 
      })
    },
    [history, params.tableName]
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
          {mapFieldComponents(entity).map(
            ({ Component, props }, index) =>
              <Column size={6} key={index}>
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
