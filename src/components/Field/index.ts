export type FieldTypes =
  | 'text'
  | 'password'
  | 'number'
  | 'date'
  | 'time'
  | 'email'
  | 'checkbox'
  | 'radio'
  | 'checkbox-group'
  | 'switch'
  | 'n:1'
  | 'n:m'
  | 'select'

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
export { default as RelationSelectField } from './RelationSelect'