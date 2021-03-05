import { getEntityPk, getEntityLabel, IEntity } from "./entity"
import { IEntryData, IFilter } from "./entry"
import graphql, { IGQuery } from "./graphql"

export function getEntryPk(entity: IEntity, value: IEntryData) {
  const name = getEntityPk(entity)?.name
  return name && value[name]
}

export function getEntryLabel(entity: IEntity, value: IEntryData) {
  const name = getEntityLabel(entity)?.name
  return name && value[name]
}

export function getEntries(entityName: string, filter: IFilter = {}, fields?: string[]): Promise<IEntryData[]> {

  // TODO: use reducers
  
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
        return data
      }
    }
  )
}
