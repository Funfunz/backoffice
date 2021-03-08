import { IEntryData, IFilter } from "./entry"
import Entity from 'services/entity'
import graphql, { IGQuery } from "./graphql"


export function getEntries(entity: Entity, filter: IFilter = {}, view: Parameters<Entity['getProperties']>[0] = 'list'): Promise<IEntryData[]> {

  const query: IGQuery = {
    operation: entity.getName(),
    fields: entity.getProperties(view) || Object.keys(filter),
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
