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