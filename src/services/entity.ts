import graphql from 'services/graphql'

export interface IProperty {
  name: string,
  searchable: boolean,
  model?: {
    isPk?: boolean,
    type: string,
    allowNull: boolean,
  },
  layout?: {
    label?: string,
    editField?: {
      type: 'text' | 'number' | 'password',
    },
    entityPage?: {
      filterable?: {
        type: string,
        inputType: 'checkbox'
        checked: unknown
        unChecked: unknown
      } | {
        type: string,
        inputType: 'select',
        content: {
          label: string,
          value: unknown,
        }[]
      },
    },
    visible?: {
      entityPage: boolean,
      detail: boolean,
      relation: boolean
    },
    [key: string]: unknown
  }
}

export interface IRelation {
  type: "n:1" | "n:m"
  foreignKey: string
  relationalTable: string
  remoteTable: string
}

export interface IEntity {
  error?: boolean
  loading?: boolean
  name: string
  properties?: IProperty[]
  layout: {
    label: string
  },
  relations?: IRelation[]
}

export function getEntityPk(entity: IEntity) {
  return entity.properties?.find(p => p.model?.isPk)
}

export function getEntityLabel(entity: IEntity) {
  return entity.properties?.find(p => p.layout?.visible?.relation)
}

export async function getEntity(entityName: string): Promise<IEntity> {
  return graphql.query({
    operation: 'config',
    fields: [entityName]
  }).then(
    (config: any) => {
      if (config[entityName]) {
        return config[entityName]
      } else {
        throw new Error(`Entity ${entityName} not found`)
      }
    }
  ).catch(
    (error) => {
      throw error
    }
  )
}
