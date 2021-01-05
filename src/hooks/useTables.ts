import { useEffect } from 'react'
import { useSelector } from "reducers"

import table from 'services/api/models/table'

export default function useTables() {

  const {
    tables,
    loadingTables,
    errorTables,
  } = useSelector((state) => (
    {
      tables: state.tables,
      loadingTables: state.loadingTables,
      errorTables: state.errorTables
    }
  ))

  useEffect(() => {
    if (tables.length === 0 && !loadingTables && !errorTables) {
      table.list()
    }
  }, [tables, loadingTables, errorTables])

  return { tables, loadingTables, errorTables }
}