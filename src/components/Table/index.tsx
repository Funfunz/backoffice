import React, { FC } from 'react'

import Checkbox from 'components/checkbox'
import Message from 'components/message'

import classes from './style.module.scss'

export const Table: FC = ({ children }) => {
  return (
    <table className={classes.table}>
      {children}
    </table>
  )
}

export interface ITableHeadProps {
  columns: { name: string, label?: string}[]
  onColumnClick?: (columnName: string) => void
  actions?: boolean
}
export const TableHead: FC<ITableHeadProps> = ({ columns, onColumnClick, actions = false }) => {
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

export interface ITableBody {
  loading?: boolean
}
export const TableBody:  FC<ITableBody> = ({ loading = false, children }) => {
  return (
    <tbody>
      {loading
        ? <Message loading />
        : children
      }
    </tbody>
  )
}

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