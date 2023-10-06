import { FC, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useEntry } from 'hooks/useEntry'
import { useEntity } from 'hooks/useEntity'
import { mapFieldComponents } from 'utils/fields'

import ActionButton from 'components/ActionButton'
import { Column, Grid } from 'components/Grid'
import PageTitle from 'components/PageTitle'

import style from './style.module.scss'

type TParams = { 
  entityName: string
  id?: string
  view: 'edit' | 'view' | 'new'
}

const TITLE_BY_VIEW = {
  'edit': 'Edit entry',
  'new': 'New entry',
  'view': 'View entry'
}

export const Component: FC<{}> = () => {
  console.log('export const Component:')
  const { entityName, id, view } = useParams<TParams>()
  const history = useNavigate()

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
      history(`/list/${entityName}`)
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
        <PageTitle text={TITLE_BY_VIEW[view || 'view']} />
      </div>

      <div className={style.editTableContainer}>
        <Grid>
          {mapFieldComponents(entity, view).map(
            ({ Component, props }, index) =>
              <Column size={6} key={index}>
                <Component
                  {...props}
                  readOnly={props.readOnly || view === 'view'}
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
