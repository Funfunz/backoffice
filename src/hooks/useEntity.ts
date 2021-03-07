import { useEffect } from 'react'
import { runForceUpdate, useForceUpdate } from 'react-forceupdate'
import Entity from 'services/entity'

const entities: Record<string, Entity> = {}

/* Get entity config by entity name */
export function useEntity(entityName: string): Entity | undefined {

  useForceUpdate(`entities/${entityName}`)

  useEffect(() => { 
    if (!entities[entityName] && !entities[entityName]?.loading && !entities[entityName]?.error) {
      (entities[entityName] as any) = { loading: true }
      Entity.fetchEntity(entityName).then(
        (entity) => {
          entities[entityName] = entity
          entities[entityName].loading = false
          entities[entityName].error = false
          runForceUpdate(`entities/${entityName}`)
        }
      ).catch(
        (error) => {
          (entities[entityName] as any) = { loading: false, error }
          runForceUpdate(`entities/${entityName}`)
        }
      )
    } 
  }, [entityName])

  return entities[entityName]
}