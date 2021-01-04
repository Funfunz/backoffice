import api from 'services/api'
import * as gql from 'gql-query-builder'
import { dispatch } from 'reducers'
import { FETCH_ENTITIES_COUNT, FETCH_ENTITIES_COUNT_LOADING } from 'reducers/entitiesCount'

const getEntitiesCount = async (entities: string[]) => {
  dispatch({ 
    type: FETCH_ENTITIES_COUNT_LOADING, 
    payload: true,
  })

  const entitiesNameToCount = entities.map(entity => `${entity}Count`)
  const graphQl = gql.query({
    operation: entitiesNameToCount.join()
  })

  return await api.post('/?', {
    body: JSON.stringify({
      query: graphQl.query
    })
  }).then(result => {
    const newResult = entities.map(entity => {
      return {
        entity: entity,
        count: result.data[`${entity}Count`]
      }
    })

    dispatch({ 
      type: FETCH_ENTITIES_COUNT, 
      payload: newResult,
    })

    return newResult
  }).catch(error => {
    throw error
  })
}

export default getEntitiesCount