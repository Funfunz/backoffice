import type { IEntity } from "services/entity"
import { IProperty } from "services/table"

export interface IField {
  component: string     // react component that should be used to render the field
  props: {              // props that should be passed to that component
    name: string
    label: string
    type: string
    value?: any
    onChange?: (name: string, value: any) => void
    readonly?: boolean
    [key: string]: any  // other props for special components
  } 
}

const MAP_TYPE_TO_COMP = {
  'text': 'Input',
  'number': 'Input',
}

function mapComponentName(property: IProperty) {
  return property.layout?.editField?.type || 
    (MAP_TYPE_TO_COMP as any)[property.model?.type as any] || 
    MAP_TYPE_TO_COMP['text']
}

export function mapFieldComponents(entity: IEntity): IField[] {
  return entity.properties
    ? entity.properties.map(
        (property) => {
          return {
            component: mapComponentName(property),
            props: {
              name: property.name,
              label: property.layout?.label || property.name,
              type: property.layout?.editField?.type || property.model?.type || 'text',
              ...(property.layout?.editField || {})
            }
          }
        }
      )
    : []
}