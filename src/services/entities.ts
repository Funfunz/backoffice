import { IEntity } from "./entity"
import graphql from "./graphql"

export function listEntities() {
  return graphql.query({
    operation: 'entities',
    fields: ['name', 'layout'],
  }).then(
    (entities?: IEntity[]) => {
      if (entities && entities.length > 0) {
        return entities
      } else {
        throw new Error('No entities found')
      }
    }
  )
}
