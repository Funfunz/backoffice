import { dispatch } from "reducers"
import { 
  FETCH_ENTITIES_FULFILLED,
  FETCH_ENTITIES_PENDING,
  FETCH_ENTITIES_REJECTED
} from "reducers/entity"
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
