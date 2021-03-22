import { useEffect } from 'react'
import { runForceUpdate, useForceUpdate } from 'react-forceupdate'
import Entity from '../services/entity'

function shouldFetchEntity(entityName?: string) {
  return entityName &&
    !Entity.getEntity(entityName) && 
    !Entity.isLoading(entityName) && 
    !Entity.isError(entityName)
}

/* Get entity config by entity name */
export function useEntity(entityName?: string): Entity | undefined {

  useForceUpdate(`entities/${entityName}`)

  useEffect(() => { 
    if (shouldFetchEntity(entityName)) {
      Entity.fetchEntity(entityName as string).then(() => {
        runForceUpdate(`entities/${entityName}`)
      })
    } 
  }, [entityName])

  return entityName ? Entity.getEntity(entityName) : undefined
}