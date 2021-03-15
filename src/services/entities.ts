import graphql from "./graphql"

export function listEntities() {
  return graphql.query({
    operation: 'entities',
    fields: ['name', 'layout'],
  }).then(
    (entities?: { name: string, layout: { label?: string }}[]) => {
      if (entities && entities.length > 0) {
        return entities.map((entity) => {
          return {
            name: entity.name,
            label: entity.layout.label || entity.name
          }
        })
      } else {
        throw new Error('No entities found')
      }
    }
  )
}
