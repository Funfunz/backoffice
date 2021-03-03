import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'reducers'
import { IFilter, IEntryData, entryEquals, getEntryData, saveEntryData, entryDiff } from 'services/entry'
import type { IEntity } from 'services/table'

/*
 * To be used on Create, View and Edit pages to get and set entry values
 */
export function useEntry(entity: IEntity, filter?: IFilter): [IEntryData, React.Dispatch<React.SetStateAction<IEntryData>>, () => Promise<void>] {
  const entry = useSelector((state) => state.entry) as IEntryData
  const loading = useSelector((state) => state.loadingEntry)
  const error = useSelector((state) => state.errorEntry)
  const [modifiedEntry, setEntry] = useState(entry || {})
  useEffect(() => {
    if (filter && !entryEquals(entry, filter) && !loading && !error && entity.properties?.length) {
      getEntryData(
        entity.name,
        filter,
        entity.properties?.filter(p => p.layout?.visible?.entityPage).map(p => p.name)
      ).then(
        (data) => {
          setEntry(data)
        }
      )
    } 
  }, [entity, filter, loading, error, entry])

  const saveEntry = useCallback(() => {
    return saveEntryData(entity.name, entryDiff(entry, modifiedEntry), filter)
  }, [entity, filter, modifiedEntry, entry])

  return [modifiedEntry, setEntry, saveEntry]
}