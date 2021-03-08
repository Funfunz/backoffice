import React, { useCallback } from "react"
import { FC, memo } from "react"
import { IFieldProps } from "components/Field"
import FieldWrapper from 'components/Field/Wrapper'
import classes from './style.module.scss'

export interface ISelectFieldOption {
  value: string | number
  label?: string
}
  
export interface ISelectField extends IFieldProps {
  options?: ISelectFieldOption[]
}

const SelectField: FC<ISelectField> = ({ 
  name,
  label,
  placeholder,
  value,
  onChange,
  options = [],
}) => {

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(name, event.target.value)
    }
  }, [name, onChange])

  return (
    <FieldWrapper name={name} label={label}>
      <select
        className={classes.select}
        id={`field-${name}`}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      >
        {options.map(
          (option, index) => (
            <option key={index} value={option.value}>
              {option.label || option.value}
            </option>
          )
        )}
      </select>
    </FieldWrapper>
  )
}

export default memo(SelectField)