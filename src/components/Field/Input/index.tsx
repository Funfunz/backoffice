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
      onChange(name, event.target.value)
    }
  }, [name, onChange])
  
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