import { useEffect } from 'react'
import { runForceUpdate, useForceUpdate } from 'react-forceupdate'
import Entity from 'services/entity'

const entities: Record<string, Entity> = {}
const loading: Record<string, boolean> = {}
const errors: Record<string, boolean | any> = {}

/* Get entity config by entity name */
export function useEntity(entityName?: string): Entity | undefined {

  useForceUpdate(`entities/${entityName}`)

  useEffect(() => { 
    if (entityName && !entities[entityName] && !loading[entityName] && !errors[entityName]) {
      loading[entityName] = true
      Entity.fetchEntity(entityName).then(
        (entity) => {
          entities[entityName] = entity
          loading[entityName] = false
          errors[entityName] = false
          runForceUpdate(`entities/${entityName}`)
        }
      ).catch(
        (error) => {
          if (entityName) {
            errors[entityName] = error
          }
          runForceUpdate(`entities/${entityName}`)
        }
      )
    } 
  }, [entityName])

  return entityName ? entities[entityName] : undefined
}