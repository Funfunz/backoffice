import { useEffect } from 'react'
import { useSelector } from 'reducers'

import tableService  from 'services/api/models/table'

let previousTableName = ''

export default function useTableData(tableName: string) {

  const {
    tableData,
    errorTableData,
    loadingTableData,
    tableConfig
  } = useSelector((state) => {
    return {
      tableData: state.tableData,
      errorTableData: state.errorTableData,
      loadingTableData: state.loadingTableData,
      tableConfig: state.tables.find(
        (table) => table.name === tableName
      )
    }
  })

  useEffect(() => {
    if ((!tableData || tableName !== previousTableName) && !loadingTableData && tableConfig?.columns) {
      previousTableName = tableName
      tableService.getTableData(tableConfig, {
        skip: 0,
        take: 10
      })
    }
  }, [tableData, loadingTableData, tableName, tableConfig])

  return { 
    tableData: tableData || [],
    loadingTableData,
    errorTableData,
  }
}