import React, { FC, memo, useCallback } from 'react';
import { Checkbox } from 'components/checkbox';

export interface ITableHeadProps {
  columns: Array<{ name: string, label?: string } | string>,
  onColumnClick?: ((columnName: string) => void),
  actions?: boolean,
}

const TableHeadComponent: FC<ITableHeadProps> = ({ columns, onColumnClick, actions = false }) => {
  const handleClick = useCallback((index: number) => {
    if (!onColumnClick) {
      return undefined
    }
    const column = columns[index]
    return () => column && onColumnClick(
      typeof column === 'string'
        ? column
        : column.name
    )
  }, [columns, onColumnClick])
  return (
    <thead>
      <tr>
        <th>
          <Checkbox />
        </th>
        {columns.map((column, index) => (
          <th key={index} onClick={handleClick(index)}>
            {typeof column === 'string'
              ? column
              : column.label || column.name
            }
          </th>
        ))}
        {actions && (
          <th></th>
        )}
      </tr>
    </thead>
  )
}

export const TableHead = memo(TableHeadComponent);