import graphql from "./graphql"

export function listEntities() {
  return graphql.query({
    operation: 'entities',
    fields: ['name', 'backoffice'],
  }).then(
    (entities?: { name: string, backoffice: { label?: string }}[]) => {
      if (entities && entities.length > 0) {
        return entities.map((entity) => {
          return {
            name: entity.name,
            label: entity.backoffice?.label || entity.name
          }
        })
      } else {
        throw new Error('No entities found')
      }
    }
  )
}
