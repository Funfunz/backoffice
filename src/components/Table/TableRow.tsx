import React, { FC, memo } from "react"
import Checkbox from "components/checkbox"
import classes from './style.module.scss'

export interface ITableRowProps {
  columns: string[]
  data: Record<string, any>
  actions?: React.ReactNode[]
}

export const TableRow: FC<ITableRowProps> = ({ columns, data, actions }) => {
  return (
    <tr>
      <td>
        <Checkbox/>
      </td>
      {columns.map((column, index) => (
        <td key={index}>
          {data[column]}
        </td>
      ))}
      {actions && (
        <td className={classes.actions}>
          {actions}
        </td>
      )}
    </tr>
  )
}

export default memo(TableRow)