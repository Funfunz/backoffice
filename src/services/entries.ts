import { IEntryData, IFilter } from './entry'
import Entity from './entity'
import graphql, { IFields, IGQuery } from './graphql'

export interface IGetEntriesArgs {
  entity: Entity
  filter?: IFilter
  view?: Parameters<Entity['getProperties']>[0]
  take?: number
  skip?: number
  search?: string
  fields?: IFields
}

export function parseFilter(entity: Entity, filter: IFilter, search?: string) {
  const result: any = {}
  Object.keys(filter).filter((key) => filter[key]).forEach((key) => {
    const value = filter[key]
    if (typeof value === 'string') {
      result[key] = { _like: `%${value}%` }
    } else if (Array.isArray(value)){
      result[key] = { _in: value }
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      result[key] = { _eq: value }
    } else {
      result[key] = value
    }
  })
  if (search) {
    result[entity.getPropertyToBeUsedAsLabel()] = {
      _like: `%${search}%`
    }
  }
  return result
}

export function countEntries({ entity, filter = {}, search }: IGetEntriesArgs): Promise<number> {

  const query: IGQuery = {
    operation: entity.getName() + 'Count',
    args: {
      filter: parseFilter(entity, filter, search),
    },
  }
  return graphql.query(query).then((data: any) => {
    if (data) {
      return data
    }
  })
}

export function deleteEntries(entity: Entity, filter: IFilter) {
  const entityName = entity.getName()

  const query = {
    operation: `delete${entityName[0].toUpperCase() + entityName.substr(1)}`,
    args: {
      filter: parseFilter(entity, filter),
    },
    fields: ['deleted'],
  }
  return graphql.mutation(query).then((data: any) => {
    if (data) {
      return data
    }
  })
}

export function getEntries({
  entity,
  filter = {},
  view = 'list',
  take = 10,
  skip = 0,
  search,
  fields,
}: IGetEntriesArgs): Promise<IEntryData[]> {
  
  const query: IGQuery = {
    operation: entity.getName(),
    fields: fields || entity.getProperties(view) || Object.keys(filter),
    args: {
      filter: parseFilter(entity, filter, search),
      take,
      skip,
    },
  }

  return graphql.query(query).then((data: any) => {
    if (data) {
      return data
    }
  })
}
