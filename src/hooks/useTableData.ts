import { useEffect } from 'react'
import { useSelector } from 'reducers'

import tableService  from 'services/api/models/table'

let previousTableName = ''

export default function useTableData(tableName: string) {

  const {
    tableData,
    errorTableData,
    loadingTableData,
    page,
    itemsByPage,
    tableConfig
  } = useSelector((state) => {
    return {
      tableData: state.tableData,
      errorTableData: state.errorTableData,
      loadingTableData: state.loadingTableData,
      page: state.page,
      itemsByPage: state.itemsByPage,
      tableConfig: state.tables.find(
        (table) => table.name === tableName
      )
    }
  })

  useEffect(() => {
    if ((!tableData || tableName !== previousTableName) && !loadingTableData && tableConfig?.properties) {
      previousTableName = tableName
      tableService.getTableData(tableConfig, {
        skip: page,
        take: itemsByPage,
      })
    }
  }, [tableData, loadingTableData, tableName, tableConfig, page, itemsByPage])

  return { 
    tableData: tableData || [],
    loadingTableData,
    errorTableData,
  }
}