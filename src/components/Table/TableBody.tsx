import React, { FC, memo, ReactNode } from 'react'
import Message from 'components/message'

export interface ITableBody {
  loading?: boolean
  children: ReactNode
}

const TableBody:  FC<ITableBody> = ({ loading = false, children }) => {
  return (
    <tbody>
      {loading
        ? <Message loading />
        : children
      }
    </tbody>
  )
}

export default memo(TableBody)
