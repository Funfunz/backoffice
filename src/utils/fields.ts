import type { IEntity } from "services/entity"
import { IProperty } from "services/table"
import { IFieldProps, InputField, FieldTypes } from 'components/fields'

export interface IMappedField {
  Component: React.ComponentType<IFieldProps>
  props: IFieldProps
}

const MAP_TYPE_TO_COMP: { [key: string]: React.ComponentType<IFieldProps> } = {
  'text': InputField,
  'number': InputField,
  'email': InputField,
  'password': InputField,
}

function mapComponentName(property: IProperty) {
  return (MAP_TYPE_TO_COMP as any)[property.layout?.editField?.type as any] || 
    (MAP_TYPE_TO_COMP as any)[property.model?.type as any] || 
    MAP_TYPE_TO_COMP['text']
}

export function mapFieldComponents(entity: IEntity): IMappedField[] {
  return entity.properties
    ? entity.properties.map(
        (property) => {
          return {
            Component: mapComponentName(property),
            props: {
              name: property.name,
              label: property.layout?.label || property.name,
              type: property.layout?.editField?.type || property.model?.type as FieldTypes || 'text' ,
              ...(property.layout?.editField || {})
            }
          }
        }
      )
    : []
}