import React, { FC, memo, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { useEntry } from 'hooks/useEntry'
import { useEntity } from 'hooks/useEntity'
import { mapFieldComponents } from 'utils/fields'

import ActionButton from 'components/ActionButton'
import { Column, Grid } from 'components/Grid'
import PageTitle from 'components/PageTitle'

import style from './style.module.scss'

interface IParams { 
  entityName: string
  id?: string
  view: 'edit' | 'view' | 'new'
}

const TITLE_BY_VIEW = {
  'edit': 'Edit entry',
  'new': 'New entry',
  'view': 'View entry'
}

const Edit: FC<{}> = () => {

  const { entityName, id, view } = useParams<IParams>()
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
        <PageTitle text={TITLE_BY_VIEW[view]} />
      </div>

      <div className={style.editTableContainer}>
        <Grid>
          {mapFieldComponents(entity).map(
            ({ Component, props }, index) =>
              <Column size={6} key={index}>
                <Component
                  readOnly={view === 'view'}
                  {...props} 
                  onChange={handleChange}
                  value={entry[props.name] as string || ''}
                />
              </Column>
          )}
        </Grid>

        <div className={style.actions}>
          <ActionButton
            type="goback"
            onClick={goBack}
            label={view === 'view' ? 'GO BACK' : 'CANCEL'}
          />
          {view === 'view'
            ? <ActionButton 
                type="save"
                label="EDIT"
                navigateTo={`/edit/${entityName}/${id}`} 
              />
            : <ActionButton 
                type="save"
                label="SAVE"
                onClick={save}
              />
          }
        </div>
      </div>
    </div>
  )
}

export default memo(Edit)
