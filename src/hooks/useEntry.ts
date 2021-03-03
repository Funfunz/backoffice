import { useCallback, useEffect, useState } from "react"
import { useSelector } from "reducers"
import { IEntity } from "services/entity"
import { entryDiff, entryEquals, getEntryData, IEntryData, IFilter, saveEntryData } from "services/entry"


export interface IUseEntry {
  entry: IEntryData,
  setEntry: React.Dispatch<React.SetStateAction<IEntryData>>,
  saveEntry: () => Promise<void>,
  error: boolean
}

/*
 * To be used on Create, View and Edit pages to get and set entry values
 */
export function useEntry(entity: IEntity, filter?: IFilter): IUseEntry {
  const fetchedEntry = useSelector((state) => state.entry) as IEntryData
  const loading = useSelector((state) => state.loadingEntry)
  const [error, setError] = useState(false)
  const [entry, setEntry] = useState(fetchedEntry || {})
  
  useEffect(() => {
    if (filter && !entryEquals(fetchedEntry, filter) && !loading && !error && entity.properties?.length) {
      getEntryData(
        entity.name,
        filter,
        entity.properties?.filter(p => p.layout?.visible?.entityPage).map(p => p.name)
      ).then(
        (data) => {
          if (data && entryEquals(data, filter)) {
            setEntry(data)
          } else {
            setError(true)
          }
        }
      ).catch(
        () => {
          setError(true)
        }
      )
    } 
  }, [entity, filter, loading, error, fetchedEntry])

  const saveEntry = useCallback(() => {
    return saveEntryData(entity.name, entryDiff(fetchedEntry, entry), filter)
  }, [entity, filter, entry, fetchedEntry])

  return {
    entry, 
    setEntry, 
    saveEntry,
    error,
  }
}