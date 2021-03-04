import { dispatch } from "reducers"
import { FETCH_ENTRY_FULFILLED, FETCH_ENTRY_PENDING, FETCH_ENTRY_REJECTED } from "reducers/entry"
import graphql, { IGQuery } from "./graphql"

export interface IFilter {
  [key: string]: string | number | boolean
}
export interface IEntryData {
  [key: string]: string | number | boolean | undefined
}

export function getEntryData(entityName: string, filter?: IFilter, fields?: string[]): Promise<IEntryData> {
  if (!filter) {
    const payload = {}
    dispatch({ type: FETCH_ENTRY_FULFILLED, payload })
    return Promise.resolve(payload)
  }
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

export async function saveEntryData(entityName: string, data: any, filter?: IFilter, ): Promise<void> {
  const mutation: IGQuery = {
    operation: entityName[0].toUpperCase() + entityName.substr(1),
    args: {
      data
    },
    fields: Object.keys(data)
  }
  if (filter && mutation.args) {
    mutation.operation = 'update' + mutation.operation
    mutation.args.filter = Object.keys(filter).reduce((res, key) => ({
      ...res,
      [key]: {
        _eq: filter[key]
      }
    }), {})
    if (!mutation.fields?.length) {
      mutation.fields = Object.keys(filter)
    }
  } else {
    mutation.operation = 'add' + mutation.operation
  }
  return graphql.mutation(mutation).then(
    (data) => {
      const payload = Array.isArray(data)
        ? data[0]
        : data
      dispatch({ type: FETCH_ENTRY_FULFILLED, payload })
      return payload
    }
  )
}


export function entryEquals(entry: any, filter?: IFilter) {
  if (!filter && entry && !Object.keys(entry).length) {
    return true
  }
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
