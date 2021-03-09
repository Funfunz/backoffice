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

export function countEntries({ entity, filter = {} }: IGetEntriesArgs): Promise<number> {

  const query: IGQuery = {
    operation: entity.getName() + 'Count',
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
      filter: {},
      take,
      skip
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
        return data
      }
    }
  )
}
