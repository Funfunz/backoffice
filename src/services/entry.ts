import Entity from './entity'
import graphql, { IGQuery } from './graphql'

export interface IFilter {
  [key: string]: string | number | boolean | IFilter
}
export interface IEntryData {
  [key: string]: string | number | boolean | undefined
}

export async function getEntryData(entity: Entity, filter?: IFilter): Promise<IEntryData> {
  const relationEntities = await Promise.all(entity.getMnRelations().map((entityName) => {
    return Entity.fetchEntity(entityName)
  }))
  const fields = [
    ...entity.getProperties('edit'), 
    ...relationEntities.map((entity) => ({
      [entity.getName()]: entity.getProperties('relation') as string[],
    })),
  ]
  if (!filter) {
    const payload = {}
    return Promise.resolve(payload)
  }
  const query: IGQuery = {
    operation: entity.getName(),
    fields: fields.length ? fields : Object.keys(filter),
    args: {
      filter: {},
    },
  }
  Object.keys(filter).forEach((key) => {
    (query.args as any).filter[key] = {
      _eq: filter[key],
    }
  })
  return graphql.query(query).then((data: any) => {
    if (data) {
      return data && data[0]
    }
  }).then((data) => {
    relationEntities.forEach((entity) => {
      data[entity.getName()] = data[entity.getName()].map((entry: Record<string, number | string>) => {
        return entry[entity.getPk()]
      })
    })
    return data
  })
}

export async function saveEntryData(entity: Entity, data: any, filter?: IFilter): Promise<void> {
  if (!data || !Object.keys(data).length) {
    return Promise.resolve()
  }
  const entityName = entity.getName()
  const relationEntities = await Promise.all(entity.getMnRelations().map((entityName) => {
    return Entity.fetchEntity(entityName)
  }))
  const fields = [
    ...entity.getProperties('edit'), 
    ...relationEntities.map((entity) => ({
      [entity.getName()]: entity.getProperties('relation') as string[],
    })),
  ]
  const mutation: IGQuery = {
    operation: entityName[0].toUpperCase() + entityName.substr(1),
    args: {
      data,
    },
    fields,
  }
  
  if (filter && mutation.args) {
    mutation.operation = 'update' + mutation.operation
    mutation.args.filter = Object.keys(filter).reduce((res, key) => ({
      ...res,
      [key]: {
        _eq: filter[key],
      },
    }), {})
    if (mutation.fields?.length) {
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
    },
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
    true as boolean,
  )
}

export function entryEquals(entry: any, filter?: IFilter): boolean {
  if (entry === undefined && filter === undefined) {
    return true
  }
  if (!filter && entry && !Object.keys(entry).length) {
    return true
  }
  return entry && !!filter && Object.keys({ ...filter, ...entry }).reduce(
    (result, key) => {
      if (typeof entry[key] === 'object' && typeof filter[key] === 'object') {
        return result && entryEquals(entry[key], filter[key] as { [key: string]: IFilter })
      } else {
        // eslint-disable-next-line eqeqeq
        return result && entry[key] == filter[key]
      }
    },
    true as boolean,
  )
}

export function entryDiff(entry: any, newEntry: any) {
  if (/*entry instanceof File || newEntry instanceof File || */typeof newEntry === 'string' || typeof entry === 'number' || typeof newEntry === 'number' || typeof entry === 'boolean' || typeof newEntry === 'boolean') {
    return entry !== newEntry ? newEntry : undefined
  }
  if (Array.isArray(entry) || Array.isArray(newEntry)) {
    for (let i=0; i<Math.max(entry?.length || 0, newEntry?.length || 0); i++) {
      if (entry?.[i] !== newEntry?.[i]) {
        return newEntry
      }
    }
    return undefined
  }
  const result: IEntryData = {}
  Object.keys({ ...entry, ...newEntry }).forEach((key) => {
    const tmp = entryDiff(entry[key], newEntry[key])
    if (tmp !== undefined) {
      result[key] = tmp
    }
  })
  return result
}
