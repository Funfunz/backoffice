import { useCallback, useEffect } from "react"
import { dispatch, useSelector } from "reducers"
import { FETCH_ENTRY_FULFILLED, FETCH_ENTRY_PENDING, FETCH_ENTRY_REJECTED } from "reducers/entry"
import { useEntity } from "./entity"
import graphql, { IGQuery } from "./graphql"

export interface IFilter {
  [key: string]: string | number | boolean
}
export interface IEntryData {
  [key: string]: string | number | boolean
}

export function getEntryData(entityName: string, filter: IFilter, fields: string[]): Promise<IEntryData> {
  dispatch({ type: FETCH_ENTRY_PENDING })
  console.log(fields)
  const query: IGQuery = {
    operation: entityName,
    fields: fields.length > 0 ? fields : Object.keys(filter),
    args: {
      filter: {}
    }
  }
  Object.keys(filter).forEach(
    (key) => {
      (query.args as any).filter[key] = {
        _eq: filter[key]
      }
    }
  )
  return graphql.query(query).then(
    (data: any) => {
      if (data) {
        dispatch({ 
          type: FETCH_ENTRY_FULFILLED,
          payload: data && data[0],
        })
        return data && data[0]
      }
    }
  ).catch(
    (error) => {
      dispatch({ 
        type: FETCH_ENTRY_REJECTED,
        payload: error
      })
    }
  )
}

export async function saveEntryData(entityName: string, filter: IFilter, data: any): Promise<void> {
  // TODO: save entry data to graphql
}

export function entryEquals(entry: any, filter: IFilter) {
  return entry && filter && Object.keys(filter).reduce(
    (result, key) => {
      // eslint-disable-next-line eqeqeq
      return result && entry[key] == filter[key]
    },
    true as boolean
  )
}

/*
 * To be used on Create, View and Edit pages to get and set entry values
 */
export function useEntry(entityName: string, filter: IFilter) {
  const entry = useSelector((state) => state.entry) 
  const loading = useSelector((state) => state.loadingEntry)
  const error = useSelector((state) => state.errorEntry)
  const entity = useEntity(entityName)
  
  useEffect(() => {
    if (!entryEquals(entry, filter) && !loading && !error && entity.properties?.length) {
      getEntryData(entityName, filter, entity.properties?.filter(p => p.layout?.visible?.entityPage).map(p => p.name) || [])
    } 
  }, [entityName, filter, loading, error, entry, entity])

  const setEntry = useCallback((data) => {
    saveEntryData(entityName, filter, data)
  }, [entityName, filter])
  
  return [entry, setEntry]
}