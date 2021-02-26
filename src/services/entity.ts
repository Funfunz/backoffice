import { useEffect } from "react"
import { dispatch, useSelector } from "reducers"
import { FETCH_ENTITY_FULFILLED, FETCH_ENTITY_PENDING, FETCH_ENTITY_REJECTED } from "reducers/entity"
import graphql from 'services/graphql'
import { IField, mapFieldComponents } from "utils/fields"

export interface IProperty {
  name: string,
  searchable: boolean,
  model?: {
    isPk?: boolean,
    type: string,
    allowNull: boolean,
  },
  layout?: {
    label?: string,
    editField?: {
      type: 'text' | 'number' | 'password',
    },
    entityPage?: {
      filterable?: {
        type: string,
        inputType: 'checkbox'
        checked: unknown
        unChecked: unknown
      } | {
        type: string,
        inputType: 'select',
        content: {
          label: string,
          value: unknown,
        }[]
      },
    },
    visible?: {
      entityPage: boolean,
      detail: boolean,
      relation: boolean
    },
    [key: string]: unknown
  }
}

export interface IEntity {
  loading?: boolean,
  name: string,
  properties?: IProperty[],
  layout: {
    label: string,
  },
}

export async function getEntity(entityName: string): Promise<IEntity> {
  dispatch({ 
    type: FETCH_ENTITY_PENDING,
    payload: entityName 
  })
  return graphql.query({
    operation: 'config',
    fields: [entityName]
  }).then(
    (config: any) => {
      if (config[entityName]) {
        dispatch({ 
          type: FETCH_ENTITY_FULFILLED,
          payload: config[entityName],
        })
        return config[entityName]
      } else {
        throw new Error(`Entity ${entityName} not found`)
      }
    }
  ).catch(
    (error) => {
      dispatch({ 
        type: FETCH_ENTITY_REJECTED,
        payload: error 
      })
      throw error
    }
  )
}

/*
 * To be used on Create, View and Edit page to render input fields
 */
export function useEntity(entityName: string): IEntity & { label: string, fields: IField[] } {
  const entity = useSelector((state) => state.tables.find(t => t.name === entityName))
  const loading = useSelector((state) => state.loadingTables)
  const error = useSelector((state) => state.error)
  
  useEffect(() => {
    if (entity?.name !== entityName && !entity?.properties && !loading && !error) {
      getEntity(entityName)
    } 
  }, [entityName, loading, error, entity])

  return entity
    ? { 
      ...entity,
      fields: mapFieldComponents(entity),
      label: entity.layout.label || entityName
    }
    : { 
      name: entityName,
      layout: { label: entityName },
      label: entityName, 
      properties: [],
      fields: []
    }
}