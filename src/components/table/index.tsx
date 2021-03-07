import React, { FC, memo } from 'react'
import Message from 'components/message'
import TableHead from './components/table-head'
import TableRow from './components/table-row'
import Pagination from './components/pagination'
import style from './style.module.scss'
import { useHistory } from 'react-router-dom'
import Entity from 'services/entity'
import { IEntryData } from 'services/entry'

export interface ITableProps {
  entity?: Entity
  entries: IEntryData[]
  loading: boolean
}

const Table: FC<ITableProps> = ({
  entity,
  entries,
  loading,
}) => {
  const history = useHistory()
  const actions = {
    edit: (data: any) => {
      history.push(`/edit/${entity?.getName()}/${data[entity?.getPk() || 'id']}`)
    },
    delete: () => undefined,
  }
  const fields = entity?.getProperties('list') || []

  return (
    <>
      <table className={style.table}>
        <TableHead actions={true} columns={fields} />
        <tbody>
          {(loading && (
            <tr>
              <td colSpan={fields.length}>
                <Message loading />
              </td>
            </tr>
          )) ||
            (!loading &&
              entries.map((data, index) => (
                <TableRow
                  key={index}
                  actions={actions}
                  fields={fields}
                  data={data as any}
                />
              )))}
        </tbody>
      </table>
      <Pagination />
    </>
  )
}

export default memo(Table)
