import React, { FC, memo } from 'react'
import Message from 'components/message'
import TableHead from './components/table-head'
import TableRow from './components/table-row'
import Pagination from './components/pagination'
import style from './style.module.scss'
import { useHistory } from 'react-router-dom'
import { IEntity } from 'services/table'
import { IEntryData } from 'services/entry'

export interface ITableProps {
  entity?: IEntity
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
      history.push(`/edit/${entity?.name}/${data[entity?.properties?.find(p => p.model?.isPk)?.name || 'id']}`)
    },
    delete: () => undefined,
  }
  const fields = entity?.properties?.map((property) => {
    return property.layout?.visible?.entityPage ? property.name : undefined
  }).filter(p => p) as string[]

  return (
    <>
      <table className={style.table}>
        <TableHead actions={true} properties={entity?.properties || []} />
        <tbody>
          {(loading && (
            <tr>
              <td colSpan={entity?.properties?.length || 0}>
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
