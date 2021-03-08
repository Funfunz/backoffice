import React, { FC, memo } from "react"
import Checkbox from "components/checkbox"

export interface ITableHeadProps {
  columns: { name: string, label?: string}[]
  onColumnClick?: (columnName: string) => void
  actions?: boolean
}

const TableHead: FC<ITableHeadProps> = ({ columns, onColumnClick, actions = false }) => {
  return (
    <thead>
      <tr>
        <th>
          <Checkbox />
        </th>
        {columns.map((column, index) => (
          <th key={index} onClick={onColumnClick && onColumnClick.bind(null, column.name)}>
            {column.label || column.name}
          </th>
        ))}
        {actions && (
          <th></th>
        )}
      </tr>
    </thead>
  )
}

export default memo(TableHead)