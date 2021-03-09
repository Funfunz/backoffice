import React, { useCallback, FC, memo } from "react"
import classNames from 'classnames'
import { IFieldProps } from "components/Field"
import FieldWrapper from 'components/Field/Wrapper'
import classes from './style.module.scss'

export interface IInputField extends IFieldProps {}

const InputField: FC<IInputField> = ({ 
  name,
  type = 'text',
  label,
  value,
  placeholder,
  onChange,
  readOnly = false
}) => {

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      let value: string | number | undefined = event.target.value
      value = (value !== undefined && value !== "")
        ? type === 'number'
          ? Number(value)
          : value
        : undefined
      onChange(name, value)
    }
  }, [name, onChange, type])

  return (
    <FieldWrapper name={name} label={label}>
      <input
        className={classNames({ 
          [classes.input]: true,
          [classes.readOnly]: readOnly,
        })}
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