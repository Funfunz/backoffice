import React, { useCallback } from "react"
import { FC, memo } from "react"
import { IFieldProps } from "components/fields"
import FieldWrapper from 'components/fields/FieldWrapper'
import classes from './style.module.scss'

export interface IInputField extends IFieldProps {}

const InputField: FC<IInputField> = ({ 
  name,
  type = 'text',
  label,
  value,
  placeholder = '',
  onChange,
  readOnly = false
}) => {

  const handleChange = useCallback((event) => {
    if (onChange) {
      onChange(name, event.target.value)
    }
  }, [name, onChange])

  return (
    <FieldWrapper name={name} label={label}>
      <input
        className={classes.input}
        id={`field-${name}`}
        readOnly={readOnly}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </FieldWrapper>
    
    
  )
}

export default memo(InputField)