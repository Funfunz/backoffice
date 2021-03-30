import { IEntryData, IFilter } from './entry'
import Entity from './entity'
import graphql, { IGQuery } from './graphql'

export interface IGetEntriesArgs {
  entity: Entity
  filter?: IFilter
  view?: Parameters<Entity['getProperties']>[0]
  take?: number
  skip?: number
  search?: string
}

export function parseFilter(entity: Entity, filter: IFilter, search?: string) {
  const result: any = {}
  Object.keys(filter).filter((key) => filter[key]).forEach((key) => {
    const value = filter[key]
    result[key] = typeof value === 'string'
      ? { _like: `%${value}%` }
      : (typeof value === 'object' && Object.keys(value).find(exp => exp.startsWith('_')))
        ? value
        : { _eq: value }
  })
  if (search) {
    result[entity.getPropertyToBeUsedAsLabel()] = {
      _like: `%${search}%`
    }
  }
  return result
}

export function countEntries({ entity, filter = {} }: IGetEntriesArgs): Promise<number> {

  const query: IGQuery = {
    operation: entity.getName() + 'Count',
    args: {
      filter: parseFilter(entity, filter),
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
}: IGetEntriesArgs): Promise<IEntryData[]> {

  console.log('getEntries', filter)

  const query: IGQuery = {
    operation: entity.getName(),
    fields: entity.getProperties(view) || Object.keys(filter),
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
