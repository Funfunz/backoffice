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
    tableConfig,
    selectedFilters,
    forceTableReload
  } = useSelector((state) => {
    return {
      tableData: state.tableData,
      errorTableData: state.errorTableData,
      loadingTableData: state.loadingTableData,
      page: state.page,
      itemsByPage: state.itemsByPage,
      tableConfig: state.tables.find(
        (table) => table.name === tableName
      ),
      selectedFilters: state.selectedFilters,
      forceTableReload: state.forceTableReload
    }
  })

  useEffect(() => {
    let tablePage = page
   
    const tableChanged = !tableData || tableName !== previousTableName
    if (tableChanged) {
      tablePage = 0
    }

    if ((tableChanged || forceTableReload) && !loadingTableData && tableConfig?.properties) {
      previousTableName = tableName
      tableService.getTableData(tableConfig, {
        skip: tablePage * itemsByPage,
        take: itemsByPage,
        currentPage: tablePage,
        selectedFilters
      })
    }
  }, [tableData, loadingTableData, tableName, tableConfig, page, itemsByPage, selectedFilters, forceTableReload])

  return { 
    tableData: tableData || [],
    loadingTableData,
    errorTableData,
  }
}