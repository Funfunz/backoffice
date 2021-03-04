import React, { FC, memo } from 'react'
import Message from 'components/message'
import { TEntry } from 'reducers/entry'
import TableHead from './components/table-head'
import TableRow from './components/table-row'
import Pagination from './components/pagination'
import style from './style.module.scss'
import { TableConfig } from 'hooks/useTableConfig'
import { useHistory, useParams } from 'react-router-dom'

export interface ITableProps {
  properties?: TableConfig['properties'];
  tableData: TEntry[];
  loadingTableData: boolean;
}

const Table: FC<ITableProps> = ({
  properties = [],
  tableData,
  loadingTableData,
}) => {
  const history = useHistory()
  const { tableName = '' } = useParams<any>()
  const actions = {
    edit: (data: any) => history.push(`/edit/${tableName}/${data[properties.find(p => p.model?.isPk)?.name || 'id']}`),
    delete: () => undefined,
  }
  const fields = properties.map((property) => {
    return property.layout?.visible?.entityPage ? property.name : undefined
  }).filter(p => p) as string[]

  return (
    <>
      <table className={style.table}>
        <TableHead actions={true} properties={properties} />
        <tbody>
          {(loadingTableData && (
            <tr>
              <td colSpan={properties.length}>
                <Message loading />
              </td>
            </tr>
          )) ||
            (!loadingTableData &&
              tableData.map((data, index) => (
                <TableRow
                  key={index}
                  actions={actions}
                  fields={fields}
                  data={data}
                />
              )))}
        </tbody>
      </table>
      <Pagination />
    </>
  )
}

export default memo(Table)
