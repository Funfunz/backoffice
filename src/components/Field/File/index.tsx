import React, { useCallback, FC, memo } from "react"
import classNames from 'classnames'
import { IFieldProps } from "components/Field"
import FieldWrapper from 'components/Field/Wrapper'
import classes from './style.module.scss'
import RenderFile from "./RenderFile"

export interface IFileField extends IFieldProps {}

const FileField: FC<IFileField> = ({ 
  name,
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
}) => {

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(name, event.target?.files?.[0])
    }
  }, [name, onChange])

  return (
    <FieldWrapper name={name} label={label}>
      {readOnly
        ? <RenderFile url={value} />
        : <input
            className={classNames({ 
              [classes.input]: true,
              [classes.readOnly]: readOnly,
            })}
            id={`field-${name}`}
            name={name}
            type="file"
            placeholder={placeholder}
            onChange={handleChange}
          />
      }
      
    </FieldWrapper>
  )
}

export default memo(FileField)