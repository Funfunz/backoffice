import { useCallback, useEffect, useState } from "react"
import { dispatch, useSelector } from "reducers"
import { FETCH_ENTRY_FULFILLED, FETCH_ENTRY_PENDING, FETCH_ENTRY_REJECTED } from "reducers/entry"
import graphql, { IGQuery } from "./graphql"
import { IEntity } from "./table"

export interface IFilter {
  [key: string]: string | number | boolean
}
export interface IEntryData {
  [key: string]: string | number | boolean | undefined
}

export function getEntryData(entityName: string, filter: IFilter, fields?: string[]): Promise<IEntryData> {
  dispatch({ type: FETCH_ENTRY_PENDING })
  console.log(fields)
  const query: IGQuery = {
    operation: entityName,
    fields: (fields && !!fields.length) ? fields : Object.keys(filter),
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
  const fields = Object.keys(data)
  return graphql.mutation({
    operation: 'update' + entityName[0].toUpperCase() + entityName.substr(1),
    args: {
      filter: Object.keys(filter).reduce((res, key) => ({
        ...res,
        [key]: {
          _eq: filter[key]
        }
      }), {}),
      data,
    },
    fields: !!fields.length ? fields : Object.keys(filter)
  }).then(
    (data) => {
      console.log(data)
    }
  )
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

export function entryDiff(entry: any, newEntry: any) {
  if (typeof entry === 'string' || typeof newEntry === 'string' || typeof entry === 'number' || typeof newEntry === 'number' || typeof entry === 'boolean' || typeof newEntry === 'boolean') {
    return entry !== newEntry ? newEntry : undefined
  }
  if (Array.isArray(entry) || Array.isArray(newEntry)) {
    for (let i=0; i<Math.max(entry?.length || 0, newEntry?.length || 0); i++) {
      if (entry[i] !== newEntry[i]) {
        return newEntry
      }
    }
    return undefined
  }
  const result: IEntryData = {}
  Object.keys(entry).forEach(
    (key) => {
      const tmp = entryDiff(entry[key], newEntry[key])
      if (tmp !== undefined) {
        result[key] = tmp
      }
    }
  )
  return result
}

/*
 * To be used on Create, View and Edit pages to get and set entry values
 */
export function useEntry(entity: IEntity, filter: IFilter): [IEntryData, React.Dispatch<React.SetStateAction<IEntryData>>, () => Promise<void>] {
  const entry = useSelector((state) => state.entry) as IEntryData
  const loading = useSelector((state) => state.loadingEntry)
  const error = useSelector((state) => state.errorEntry)
  const [modifiedEntry, setEntry] = useState(entry || {})
  
  useEffect(() => {
    if (!entryEquals(entry, filter) && !loading && !error && entity.properties?.length) {
      getEntryData(
        entity.name,
        filter,
        entity.properties?.filter(p => p.layout?.visible?.entityPage).map(p => p.name)
      ).then(
        (data) => {
          setEntry(data)
        }
      )
    } 
  }, [entity, filter, loading, error, entry])

  const saveEntry = useCallback(() => {
    return saveEntryData(entity.name, filter, entryDiff(entry, modifiedEntry))
  }, [entity, filter, modifiedEntry, entry])

  return [modifiedEntry, setEntry, saveEntry]
}