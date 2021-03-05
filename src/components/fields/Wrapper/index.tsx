import React  from "react"
import { FC, memo } from "react"

import classes from './style.module.scss'

export interface IFieldWrapper {
  name: string
  label?: string
  children: React.ReactNode
}

const FieldWrapper: FC<IFieldWrapper> = ({ name, label, children }) => {
  return (
    <div className={classes.fieldContainer}>
      {label && (
        <label htmlFor={`field-${name}`} className={classes.label}>
          {label}
        </label>
      )}
      <div className={classes.field}>
        {children}
      </div>
    </div>
    
  )
}

export default memo(FieldWrapper)
