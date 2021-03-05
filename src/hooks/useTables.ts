import { useEffect } from 'react'
import { useSelector } from "reducers"

import table from 'services/table'

export default function useTables() {

  const { tables, loadingTables, error } = useSelector((state) => state)

  useEffect(() => {
    if (tables.length === 0 && !loadingTables && !error) {
      table.list()
    }
  }, [tables, loadingTables, error])

  return { tables, loadingTables, error }
}