import Entity from 'services/entity'
import { IFieldProps, InputField, SelectField, FieldTypes, RelationSelectField } from 'components/fields'

export interface IMappedField {
  Component: React.ComponentType<IFieldProps>
  props: IFieldProps
}

export function mapFieldComponents(entity?: Entity): IMappedField[] {
  return entity?.getProperties().map(
    (propertyName: string) => {

      const editField = entity.getEditFieldByProperty(propertyName)
      const relation = entity.getRelationByProperty(propertyName)

      let Component

      const props: IFieldProps = {
        name: propertyName,
        label: entity.getPropertyLabel(propertyName),
        type: (editField?.type || relation?.type || entity.getPropertyModelType(propertyName)) as FieldTypes,
        ...editField,
      }

      switch (props.type) {
        case 'n:1':
        case 'n:m':
          props.relation = relation
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
        props,
      }
    }
  ) || []
}