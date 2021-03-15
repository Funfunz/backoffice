import Entity from "services/entity"
import graphql, { IGQuery } from "./graphql"

export interface IFilter {
  [key: string]: string | number | boolean
}
export interface IEntryData {
  [key: string]: string | number | boolean | undefined
}

export function getEntryData(entity: Entity, filter?: IFilter): Promise<IEntryData> {
  const fields = entity.getProperties('edit')
  if (!filter) {
    const payload = {}
    return Promise.resolve(payload)
  }
  const query: IGQuery = {
    operation: entity.getName(),
    fields: !!fields.length ? fields : Object.keys(filter),
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
        return data && data[0]
      }
    }
  )
}

export async function saveEntryData(entity: Entity, data: any, filter?: IFilter): Promise<void> {
  const entityName = entity.getName()
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
      return payload
    }
  )
}

export function filterMatch(entry: any, filter?: IFilter) {
  if (entry === undefined && filter === undefined) {
    return true
  }
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

export function entryEquals(entry: any, filter?: IFilter) {
  if (entry === undefined && filter === undefined) {
    return true
  }
  if (!filter && entry && !Object.keys(entry).length) {
    return true
  }
  return entry && filter && Object.keys({ ...filter, ...entry }).reduce(
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
  Object.keys({ ...entry, ...newEntry }).forEach(
    (key) => {
      const tmp = entryDiff(entry[key], newEntry[key])
      if (tmp !== undefined) {
        result[key] = tmp
      }
    }
  )
  return result
}
