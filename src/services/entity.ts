import graphql from './graphql'
import { friendlyName } from '../utils'
import { IEntity } from '../utils/funfunzTypings'

export default class Entity {
  private static entities: Record<string, Entity> = {}
  private static loading: Record<string, boolean> = {}
  private static errors: Record<string, boolean> = {}
  private entity: IEntity
  constructor(entity: IEntity) {
    this.entity = entity
  }
  getName() {
    return this.entity.name
  }
  getPk() {
    return this.entity.properties?.find(p => p.isPk)?.name || 'id'
  }
  getLabel() {
    return this.entity.backoffice?.label || this.entity.name
  }
  
  getProperties(view: 'view' | 'new' |'list' | 'edit' | 'relation' | 'filter' = 'list') {
    return this.entity.properties?.filter(p => {
      switch (view) {
      case 'relation':
        return p.isPk || p.backoffice?.visible?.relation !== false
      case 'view':
        return p.isPk || p.backoffice?.visible?.detail !== false
      case 'new':
      case 'edit':
        return !this.isPropertyReadOnly(p.name) || 
          (p.backoffice?.visible?.detail !== undefined && p.backoffice?.visible?.detail) ||
          this.getMnRelations()
      case 'list':
      case 'filter':
      default:
        return p.backoffice?.visible?.entityPage !== false
      }
    }).map(p => p.name) || []
  }
  getMnRelations() {
    return this.entity.relations?.filter((relation) => {
      return relation.type === 'm:n' || relation.type === 'n:m'
    }).map((relation) => {
      return relation.remoteEntity
    }) || []
  }
  getPropertyToBeUsedAsLabel() {
    return this.entity.properties?.find(p => p.backoffice?.visible?.relation)?.name || 
    this.getPropertyByName('name')?.name  ||
    this.getPk()
  }
  private getPropertyByName(propertyName: string) {
    return this.entity.properties?.find(p => p.name === propertyName)
  }
  isPropertyReadOnly(propertyName: string) {
    const property = this.getPropertyByName(propertyName)
    return this.getPk() === propertyName || property?.readOnly
  }
  getPropertyModelType(propertyName: string) {
    const property = this.getPropertyByName(propertyName)
    return property?.type || 'string'
  }
  private getPropertyRelation(propertyName: string) {
    return this.entity.relations?.find((relation) => {
      return relation.foreignKey === propertyName || 
        relation.remoteEntity === propertyName
    })
  }
  getPropertyRelationType(propertyName: string) {
    const relation = this.getPropertyRelation(propertyName)
    return relation?.type
  }
  getPropertyRelationEntityName(propertyName: string) {
    const relation = this.getPropertyRelation(propertyName)
    return relation?.remoteEntity
  }
  getPropertyEditField(propertyName: string): Record<string, string|number|boolean> {
    const property = this.getPropertyByName(propertyName)
    return property?.backoffice?.editField || {}
  }
  getPropertyEditFieldType(propertyName: string) {
    const editField = this.getPropertyEditField(propertyName)
    return editField.type
  }
  getPropertyLabel(propertyName: string) {
    const property = this.getPropertyByName(propertyName)
    return property?.backoffice?.label || friendlyName(property?.name || propertyName)
  }
  static isError(entityName: string) {
    return Entity.errors[entityName] ? true : false
  }
  static isLoading(entityName: string) {
    return Entity.loading[entityName] || false
  }
  static getEntity(entityName: string) {
    return Entity.entities[entityName]
  }
  static async fetchEntity(entityName: string) {
    if (Entity.entities[entityName]) {
      return Entity.entities[entityName]
    }
    Entity.loading[entityName] = true
    const config = await graphql.query({
      operation: 'config',
      fields: [entityName],
    })
    if (config[entityName]) {
      Entity.entities[entityName] = new Entity(config[entityName])
      Entity.loading[entityName] = false
      Entity.errors[entityName] = false
      return Entity.entities[entityName]
    } else {
      Entity.loading[entityName] = false
      Entity.errors[entityName] = true
      throw new Error(`Entity ${entityName} not found`)
    }
  }
}
