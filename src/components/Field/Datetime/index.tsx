import React, { useCallback, FC, memo } from 'react'
import classNames from 'classnames'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import './style.scss'

import classes from '../Input/style.module.scss'

import type { IFieldProps } from '../'
import FieldWrapper from '../Wrapper'

export interface IDatetimeField extends IFieldProps {}

const DatetimeField: FC<IDatetimeField> = ({ 
  name,
  type = 'datetime',
  label,
  value,
  onChange,
  readOnly = false,
  dateFormat = type === 'time' ? false : 'YYYY/MM/DD',
  timeFormat = type === 'date' ? false : 'HH:mm',
  placeholder = `${dateFormat || ''} ${timeFormat || ''}`,
}) => {

  const handleChange = useCallback((value) => {
    if (onChange) {
      try {
        value = new Date(value).toISOString()
      } catch {
      }
      onChange(name, value)
    }
  }, [onChange, name])
  
  console.log({ value })

  return (
    <FieldWrapper name={name} label={label}>
      <Datetime
        value={new Date(value)}
        onChange={handleChange}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        open={readOnly === true ? false : undefined}
        inputProps={{ 
          className: classNames({ 
            [classes.input]: true,
            [classes.readOnly]: readOnly,
          }),
          placeholder,
          readOnly: readOnly as boolean,
        }} 
      />
    </FieldWrapper>
  )
}

export default memo(DatetimeField)