import graphql from 'services/graphql'
import { friendlyName } from 'utils'
import { IEntity } from 'utils/funfunzTypings'

export default class Entity {
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
          return !this.isPropertyReadOnly(p.name) || (p.backoffice?.visible?.detail !== undefined && p.backoffice?.visible?.detail)
        case 'list':
        case 'filter':
        default:
          return p.backoffice?.visible?.entityPage !== false
      }
    }).map(p => p.name) || []
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
    return property?.type || 'text'
  }
  private getPropertyRelation(propertyName: string) {
    return this.entity.relations?.find(r => r.foreignKey === propertyName)
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
  static fetchEntity(entityName: string) {
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
