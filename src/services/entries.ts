import { IEntryData, IFilter } from "./entry"
import Entity from 'services/entity'
import graphql, { IGQuery } from "./graphql"

export interface IGetEntriesArgs {
  entity: Entity
  filter?: IFilter
  view?: Parameters<Entity['getProperties']>[0]
  take?: number
  skip?: number
}

export function parseFilter(filter: IFilter) {
  const result: any = {}
  Object.keys(filter).forEach(
    (key) => {
      const value = filter[key]
      result[key] = typeof value === 'string'
        ? { _like: `%${value}%` }
        : { _eq: value }
    }
  )
  return result
}

export function countEntries({ entity, filter = {} }: IGetEntriesArgs): Promise<number> {

  const query: IGQuery = {
    operation: entity.getName() + 'Count',
    args: {
      filter: parseFilter(filter)
    }
  }
  return graphql.query(query).then(
    (data: any) => {
      if (data) {
        return data
      }
    }
  )
}

export function deleteEntries(entity: Entity, filter: IFilter) {
  const entityName = entity.getName()

  const query = {
    operation: `delete${entityName[0].toUpperCase() + entityName.substr(1)}`,
    args: {
      filter: parseFilter(filter),
    },
    fields: ['deleted'],
  }
  return graphql.mutation(query).then(
    (data: any) => {
      if (data) {
        return data
      }
    }
  )
}

export function getEntries({
  entity,
  filter = {},
  view = 'list',
  take = 10,
  skip = 0,
}: IGetEntriesArgs): Promise<IEntryData[]> {

  const query: IGQuery = {
    operation: entity.getName(),
    fields: entity.getProperties(view) || Object.keys(filter),
    args: {
      filter: parseFilter(filter),
      take,
      skip
    }
  }
  
  return graphql.query(query).then(
    (data: any) => {
      if (data) {
        return data
      }
    }
  )
}
