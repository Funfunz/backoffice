import type { IEntity, IRelation } from "services/entity"
import { IProperty } from "services/table"
import { IFieldProps, InputField, SelectField, FieldTypes, RelationSelectField } from 'components/fields'

export interface IMappedField {
  Component: React.ComponentType<IFieldProps>
  props: IFieldProps
}

export function mapFieldComponents(entity: IEntity): IMappedField[] {
  return entity.properties
    ? entity.properties.map(
        (property: IProperty & { relation?: IRelation }) => {
          
          property.relation = entity.relations?.find(r => r.foreignKey === property.name)

          let Component
          let props: IFieldProps = {
            name: property.name,
            label: property.layout?.label || property.name,
            type: (property.layout?.editField?.type || property.relation?.type || property.model?.type || 'text') as FieldTypes,
          }

          switch (props.type) {
            case 'n:1':
            case 'n:m':
              props.relation = property.relation
              Component = RelationSelectField
              break
            case 'select':
              Component = SelectField 
              break
            case 'text':
            case 'number':
            case 'password':
            default:
              Component = InputField
              break
          }

          return { 
            Component,
            props: {
              ...props,
              ...(property.layout?.editField || {})
            }
          }
        }
      )
    : []
}