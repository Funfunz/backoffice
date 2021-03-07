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

export type PropertiesViewType = 'list' | 'edit' | 'relation'

export default class Entity {
  public loading?: boolean
  public error?: any
  private entity: IEntity
  constructor(entity: IEntity) {
    this.entity = entity
  }
  getName() {
    return this.entity.name
  }
  getPk() {
    return this.entity.properties?.find(p => p.model?.isPk)?.name || 'id'
  }
  getLabel() {
    return this.entity.layout.label || this.entity.name
  }
   
  getProperties(view: 'list' | 'edit' | 'relation' = 'list') {
    return this.entity.properties?.filter(p => {
      switch (view) {
        case 'relation':
          return p.model?.isPk || p.layout?.visible?.relation
        case 'edit':
          return p.model?.isPk || p.layout?.visible?.entityPage
        case 'list':
        default:
          return true
      }
    }).map(p => p.name) || []
  }
  getPropertyToBeUsedAsLabel() {
    return this.entity.properties?.find(p => p.layout?.visible?.relation)?.name || this.getPk()
  }
  private getPropertyByName(propertyName: string) {
    return this.entity.properties?.find(p => p.name === propertyName)
  }
  getPropertyModelType(propertyName: string) {
    const property = this.getPropertyByName(propertyName)
    return property?.model?.type || 'text'
  }
  getRelationByProperty(propertyName: string) {
    return this.entity.relations?.find(r => r.foreignKey === propertyName)
  }
  getEditFieldByProperty(propertyName: string): Record<string, string|number|boolean> {
    const property = this.getPropertyByName(propertyName)
    return property?.layout?.editField || {}
  }
  getPropertyLabel(propertyName: string) {
    const property = this.getPropertyByName(propertyName)
    return property?.layout?.label || property?.name || propertyName
  }
  public static fetchEntity(entityName: string) {
    return graphql.query({
      operation: 'config',
      fields: [entityName]
    }).then(
      (config: any) => {
        if (config[entityName]) {
          return new Entity(config[entityName])
        } else {
          throw new Error(`Entity ${entityName} not found`)
        }
      }
    )
  }
}
