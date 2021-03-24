import React, { useCallback, FC, memo } from 'react'

import { IFieldProps } from 'components/Field'
import FieldWrapper from 'components/Field/Wrapper'

import style from './style.module.scss'

export interface ISelectFieldOption {
  value: string | number
  label: string | number
}
  
export interface IToggleField extends IFieldProps {
  options?: ISelectFieldOption[]
  isMulti?: boolean
}

const SelectField: FC<IToggleField> = ({ 
  name,
  label,
  value,
  onChange,
  readOnly,
}) => {

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      const value = event.target.checked
      onChange(name, value)
    }
  }, [name, onChange])

  const handleToggle = useCallback(() => {
    if (onChange) {
      onChange(name, !value)
    }
  }, [onChange, value, name])

  return (
    <FieldWrapper name={name} label={label}>
      <div className={style.toggleField} onClick={handleToggle}>
        <input 
          type="checkbox"
          id={`field-${name}`}
          name={name}
          onChange={handleChange}
          checked={!!value}
        />
        <div className={style.toggleIndicator}></div>
      </div>
    </FieldWrapper>
  )
}

export default memo(SelectField)