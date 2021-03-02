import React, { FC, memo, useState } from "react"
import { useParams } from 'react-router-dom'
import Table from 'components/table'
import style from './style.module.scss'
import useTableConfig from 'hooks/useTableConfig'
import Message from 'components/message'
import Toolbar from 'components/toolbar'
import Filters from 'components/filters'
import PageTitle from 'components/page-title'
import useTableData from 'hooks/useTableData'


export interface ITableProps {}

const TableView: FC<ITableProps> = () => {
  const [showFilters, setShowFilters] = useState(false)

  const toggleFilters = () =>{
    setShowFilters(!showFilters)
  }

  const { tableName = '' } = useParams<any>()

  const { table, loadingTableConfig } = useTableConfig(tableName)
  const { tableData, loadingTableData, errorTableData } = useTableData(
    tableName
  )
  return (
    <div className={style.container}>
      <div className={style.toolbar}>
        <PageTitle text={table.title()}/>
        <Toolbar toggleFilters={toggleFilters}/>
      </div>
      {showFilters && <Filters />}
      <div className={style.tableContainer}>
      {!errorTableData &&
        (loadingTableConfig ? (
          <Message loading />
        ) : (
          table &&
          tableData && (
            <Table
              tableData={tableData}
              loadingTableData={loadingTableData}
              properties={table.properties}
            />
          )
        ))}
      {errorTableData && (
        <Message error={!!errorTableData} text={errorTableData} />
      )}
      </div>
    </div>
  )
}

export default memo(TableView)
