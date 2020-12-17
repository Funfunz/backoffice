import { useEffect } from 'react'
import { useSelector } from 'reducers'

import tableService, { PKS }  from 'services/api/models/table'
import useTableConfig from './useTableConfig'

let previousEntity = ''

function isSetPKS(pks: PKS) {
  return Object.keys(pks).filter(
    pk => pks[pk] === undefined
  ).length === 0
}

export default function useEntryData(entityName: string, pks: PKS) {
  const {
    entryData,
    loadingEntry,
    errorEntry
  } = useSelector((state) => {
    const entry = previousEntity !== entityName ? undefined : state.entry
      ? Object.keys(pks).filter(
        (pk) => {
          console.log((state.entry as Record<string, unknown>)[pk])
          return (state.entry as Record<string, unknown>)[pk] === pks[pk]
        }
      )
      : undefined
    return {
      entryData: entry,
      errorEntry: state.errorEntry,
      loadingEntry: state.loadingEntry,
    }
  })

  const { table } = useTableConfig(entityName)

  useEffect(() => {
    if (!entryData && !loadingEntry && table.properties.length && isSetPKS(pks) && !errorEntry) {
      previousEntity = entityName
      tableService.getEntry(table.config, pks)
    }
  }, [entityName, entryData, errorEntry, loadingEntry, pks, table])

  return entryData
}