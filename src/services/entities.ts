import { useEffect } from "react"
import { dispatch, useSelector } from "reducers"
import { 
  FETCH_ENTITIES_FULFILLED,
  FETCH_ENTITIES_PENDING,
  FETCH_ENTITIES_REJECTED
} from "reducers/entity"
import { IEntity } from "./entity"
import graphql from "./graphql"

export function listEntities() {
  dispatch({ type : FETCH_ENTITIES_PENDING })
  return graphql.query({
    operation: 'entities',
    fields: ['name', 'layout'],
  }).then(
    (entities: any) => {
      if (entities) {
        dispatch({ 
          type: FETCH_ENTITIES_FULFILLED, 
          payload: entities,
        })
        return entities
      }
    }
  ).catch(
    (error: any) => {
      dispatch({ type: FETCH_ENTITIES_REJECTED })
      throw error
    }
  )
}

/*
 * To be used on sidebar to render entity list
 */
export function useEntities(): IEntity[] {
  const entities = useSelector((state) => state.tables)
  const loading = useSelector((state) => state.loadingTables)
  const error = useSelector((state) => state.error)
  
  useEffect(() => {
    if ((!entities || entities.length > 0) && !loading && !error) {
      listEntities()
    } 
  }, [loading, error, entities])

  return entities
}