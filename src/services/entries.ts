import { IEntryData, IFilter } from "./entry"
import Entity, { PropertiesViewType } from 'services/entity'
import graphql, { IGQuery } from "./graphql"


export function getEntries(entity: Entity, filter: IFilter = {}, view: PropertiesViewType = 'list'): Promise<IEntryData[]> {

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
