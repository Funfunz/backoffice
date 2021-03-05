import { useEffect } from 'react'
import { runForceUpdate, useForceUpdate } from 'react-forceupdate'
import type { IEntity } from 'services/entity'
import { getEntity } from 'services/entity'

const entities: Record<string, IEntity> = {}

/* Get entity config by entity name */
export function useEntity(entityName: string): IEntity {

  useForceUpdate(`entities/${entityName}`)

  useEffect(() => { 
    if (!entities[entityName]?.properties && !entities[entityName]?.loading && !entities[entityName]?.error) {
      (entities[entityName] as Partial<IEntity>) = { loading: true }
      getEntity(entityName).then(
        (entity) => {
          entities[entityName] = entity
          entities[entityName].loading = false
          entities[entityName].error = false
          runForceUpdate(`entities/${entityName}`)
        }
      ).catch(
        (error) => {
          entities[entityName].loading = false
          entities[entityName].error = error
          runForceUpdate(`entities/${entityName}`)
        }
      )
    } 
  }, [entityName])

  return { 
    name: entityName,
    layout: { label: entityName },
    properties: [],
    ...(entities[entityName] as Partial<IEntity> || {})
  }
}