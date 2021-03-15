import React, { useCallback, FC, memo } from 'react'
import classNames from 'classnames'

import { IFieldProps } from 'components/Field'
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
  readOnly,
}) => {

  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      const value = event.target.value !== undefined && event.target.value !== ""
        ? typeof options[0]?.value === 'number' 
          ? Number(event.target.value)
          : event.target.value
        : undefined
      onChange(name, value)
    }
  }, [name, onChange, options])

  return (
    <FieldWrapper name={name} label={label}>
      <select
        disabled={readOnly}
        className={classNames({
          [classes.select]: true,
          [classes.readOnly]: readOnly,
        })}
        id={`field-${name}`}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      >
        <option key={-1}>
          {placeholder}
        </option>
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