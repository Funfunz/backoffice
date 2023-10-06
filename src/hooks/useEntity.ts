import { useEffect } from 'react'
import Entity from '../services/entity'
import { useForceUpdate } from './useForceUpdate'

function shouldFetchEntity(entityName?: string) {
  return entityName &&
    !Entity.getEntity(entityName) && 
    !Entity.isLoading(entityName) && 
    !Entity.isError(entityName)
}

/* Get entity config by entity name */
export function useEntity(entityName?: string): Entity | undefined {
  const forceUpdate = useForceUpdate()
  useEffect(() => { 
    if (shouldFetchEntity(entityName)) {
      Entity.fetchEntity(entityName as string).then(
        () => forceUpdate()
      )
    } 
  }, [entityName, forceUpdate])

  return entityName ? Entity.getEntity(entityName) : undefined
}