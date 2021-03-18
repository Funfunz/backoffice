import React, { useCallback, FC, memo } from 'react'
import Select from 'react-select'

import { IFieldProps } from 'components/Field'
import FieldWrapper from 'components/Field/Wrapper'

export interface ISelectFieldOption {
  value: string | number
  label: string | number
}
  
export interface ISelectField extends IFieldProps {
  options?: ISelectFieldOption[]
  isMulti?: boolean
}

const SelectField: FC<ISelectField> = ({ 
  name,
  label,
  placeholder,
  value,
  onChange,
  options = [],
  readOnly,
  isMulti = false
}) => {

  const handleChange = useCallback((selected: ISelectFieldOption | ISelectFieldOption[]) => {
    if (onChange) {
      const value = typeof options[0]?.value === 'number' 
        ? Array.isArray(selected) ? selected.map(s => Number(s.value)) : selected && Number(selected.value)
        : Array.isArray(selected) ? selected.map(s => s.value) : selected?.value
      onChange(name, value)
    }
  }, [name, onChange, options])

  return (
    <FieldWrapper name={name} label={label}>
      <Select
        onChange={handleChange as any}
        placeholder={placeholder}
        name={name}
        isMulti={isMulti}
        value={isMulti 
          ? options.filter(o => value.includes(o.value))
          : options.find(o => o.value === value)
        }
        isDisabled={readOnly}
        options={options.map((o) => ({ 
          label: o.label || o.value,
          value: o.value,
        }))} 
      />
    </FieldWrapper>
  )
}

export default memo(SelectField)