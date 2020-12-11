import { TableConfig } from 'hooks/useTableConfig'
import React, { FC, memo, useCallback } from 'react'
import Checkbox from '../../../checkbox'

export interface ITableHeadProps {
  properties: TableConfig['properties'],
  onPropertyClick?: ((columnName: string) => void),
  actions?: boolean,
}

const TableHead: FC<ITableHeadProps> = ({ properties, onPropertyClick, actions = false }) => {
  const handleClick = useCallback((index: number) => {
    if (!onPropertyClick) {
      return undefined
    }
    const property = properties[index]
    return () => property && onPropertyClick(
      typeof property === 'string'
        ? property
        : property.name
    )
  }, [properties, onPropertyClick])
  return (
    <thead>
      <tr>
        <th>
          <Checkbox />
        </th>
        {properties.map((property, index) => (
          property.layout?.visible?.entityPage
            ? <th key={index} onClick={handleClick(index)}>
                {property.layout?.label || property.name }
              </th>
            : undefined
        ))}
        {actions && (
          <th></th>
        )}
      </tr>
    </thead>
  )
}

export default memo(TableHead)