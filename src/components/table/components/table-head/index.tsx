import React, { FC, memo } from 'react'
import Checkbox from '../../../checkbox'

export interface ITableHeadProps {
  columns: string[],
  onPropertyClick?: ((columnName: string) => void),
  actions?: boolean,
}

const TableHead: FC<ITableHeadProps> = ({ columns, actions = false }) => {
  return (
    <thead>
      <tr>
        <th>
          <Checkbox />
        </th>
        {columns.map((label, index) => (
          <th key={index}>
            {label}
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