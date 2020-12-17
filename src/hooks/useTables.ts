import { useEffect } from 'react'
import { useSelector } from "reducers"

import table from 'services/api/models/table'

export default function useTables() {

  const tables = useSelector((state) => state.tables)
  const loadingTables = useSelector((state) => state.loadingTables)

  useEffect(() => {
    if (tables.length === 0 && !loadingTables) {
      table.list()
    }
  }, [tables, loadingTables])

  return { tables, loadingTables }
}