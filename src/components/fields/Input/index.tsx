import React, { useCallback } from "react"
import { FC, memo } from "react"

import classes from './style.module.scss'

export interface IInput {
  name: string
  type?: string
  value?: string | number
  placeholder?: string
  onChange?: (name: string, value?: string | number) => void
  readOnly?: boolean
}

const Input: FC<IInput> = ({ 
  name,
  type = 'text',
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
    <input
      className={classes.input}
      id={`input-${name}`}
      readOnly={readOnly}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  )
}

export default memo(Input)