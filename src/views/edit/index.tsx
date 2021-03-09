import React, { FC, memo, useCallback } from 'react'
import Button from 'components/Button'
import PageTitle from 'components/PageTitle'
import style from './style.module.scss'
import { useParams, useHistory } from 'react-router-dom'
import { useEntry } from 'hooks/useEntry'
import { useEntity } from 'hooks/useEntity'
import { Column, Grid } from 'components/Grid'
import { mapFieldComponents } from 'utils/fields'

const Edit: FC<{}> = () => {

  const { entityName, id } = useParams<{ entityName: string, id?: string }>()
  const history = useHistory()

  const entity = useEntity(entityName)
  const { entry, setEntry, saveEntry } = useEntry(entity, isNaN(id as any) ? id : Number(id))

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
    () => {
      history.push(`/list/${entityName}`)
    },
    [history,entityName]
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
        <PageTitle text={id ? 'edit page' : 'new page'}/>
      </div>

      <div className={style.editTableContainer}>
        <Grid>
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
        </Grid>

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
