import { useEffect } from 'react'
import { useSelector } from "reducers"

import table from 'services/api/models/table'

export default function useTables() {

  const tables = useSelector((state) => state.tables)
  const loading = useSelector((state) => state.loadingTables)

  useEffect(() => {
    if (tables.length === 0 && !loading) {
      table.list()
    }
  }, [tables, loading])

  return { tables, loading }
}