export type FieldTypes =
  | 'text'
  | 'password'
  | 'number'
  | 'email'
  | 'boolean'
  | 'toggle'
  | 'date'
  | 'time'
  | 'select'
  | 'n:1'
  | 'n:m'
  | 'm:n'
  | 'file'

export interface IFieldProps {
  name: string
  label?: string
  type: FieldTypes
  value?: any
  placeholder?: string
  onChange?: (name: string, value: any) => void
  readonly?: boolean
  [key: string]: any  
}

export { default as InputField } from './Input'
export { default as SelectField } from './Select'
export { default as FileField } from './File'
export { default as RelationSelectField } from './RelationSelect'
export { default as ToggleField } from './Toggle'