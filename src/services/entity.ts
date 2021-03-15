import graphql from 'services/graphql'
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
    return this.entity.properties?.find(p => p.model?.isPk)?.name || 'id'
  }
  getLabel() {
    return this.entity.backoffice?.label || this.entity.name
  }
  getProperties(view: 'list' | 'edit' | 'relation' = 'list') {
    return this.entity.properties?.filter(p => {
      switch (view) {
        case 'relation':
          return p.model?.isPk || p.backoffice?.visible?.relation !== false
        case 'edit':
          return p.model?.isPk || p.backoffice?.visible?.entityPage !== false
        case 'list':
        default:
          return true
      }
    }).map(p => p.name) || []
  }
  getPropertyToBeUsedAsLabel() {
    return this.entity.properties?.find(p => p.backoffice?.visible?.relation)?.name || this.getPk()
  }
  private getPropertyByName(propertyName: string) {
    return this.entity.properties?.find(p => p.name === propertyName)
  }
  getPropertyModelType(propertyName: string) {
    const property = this.getPropertyByName(propertyName)
    return property?.model?.type || 'text'
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
    return property?.backoffice?.label || property?.name || propertyName
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
