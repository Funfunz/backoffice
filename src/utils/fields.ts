import Entity from 'services/entity'
import { 
  IFieldProps,
  InputField,
  SelectField,
  FieldTypes,
  RelationSelectField,
  FileField,
  DatetimeField,
  ToggleField,
} from 'components/Field'

export interface IMappedField {
  Component: React.ComponentType<IFieldProps>
  props: IFieldProps
}

export function mapFieldComponents(entity?: Entity, view: 'new' | 'edit' | 'view' | 'filter' = 'view'): IMappedField[] {
  return entity ? [
    ...entity.getProperties(view),
    ...entity.getMnRelations(),
  ].map(
    (propertyName: string) => {

      const props: IFieldProps = {
        name: propertyName,
        label: entity.getPropertyLabel(propertyName),
        readOnly: entity.isPropertyReadOnly(propertyName),
        type: (
          entity.getPropertyEditFieldType(propertyName) || 
          entity.getPropertyRelationType(propertyName) || 
          entity.getPropertyModelType(propertyName) ||
          'text'
        ) as FieldTypes,
        ...(entity.getPropertyEditField(propertyName)),
      }

      switch (props.type) {
        case 'boolean':
        case 'toggle':
          return {
            Component: ToggleField,
            props,
          }
        case 'n:1':
        case 'n:m':
        case 'm:n':
          return {
            Component: RelationSelectField,
            props: {
              relationType: props.type,
              relationEntityName: entity.getPropertyRelationEntityName(propertyName),
              ...props, 
            }
          }
        case 'select':
          return {
            Component: SelectField,
            props,
          }
        case 'file':
          return {
            Component: FileField,
            props
          }
        case 'date':
        case 'datetime':
        case 'time':
          return {
            Component: DatetimeField,
            props,
          }
        case 'text':
        case 'number':
        case 'password':
        default:
          return {
            Component: InputField,
            props,
          }
      }
    }
  ) : []
}