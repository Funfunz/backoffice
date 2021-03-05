import { useCallback, useEffect, useMemo, useState } from "react"
import { getEntityPk, IEntity } from "services/entity"
import { entryDiff, entryEquals, getEntryData, IEntryData, IFilter, saveEntryData } from "services/entry"

export interface IUseEntry {
  entry: IEntryData,
  setEntry: React.Dispatch<React.SetStateAction<IEntryData>>,
  saveEntry: () => Promise<void>,
  error: boolean
}

/* Get entry data based on a filter */
export function useEntry(entity: IEntity, filterOrPk?: IFilter | string | number): IUseEntry {

  const [fetchedEntry, setFetchedEntry] = useState<IEntryData>({})
  const [modifiedEntry, setModifiedEntry] = useState<IEntryData>({})

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  const filter = useMemo(() => {
    return (typeof filterOrPk === 'string' || typeof filterOrPk === 'number')
      ? { [getEntityPk(entity)?.name || 'id']: filterOrPk }
      : filterOrPk
  }, [filterOrPk, entity])

  const [oldArgs, setNewArgs] = useState<{ entity?: IEntity, filter?: IFilter }>({})

  const hasNewArgs = useCallback(() => {
    if (
      entity.name !== oldArgs.entity?.name || 
      entity.properties?.length !== oldArgs.entity?.properties?.length ||
      !entryEquals(filter, oldArgs.filter)
    ) {
      setNewArgs({ entity, filter })
      return true
    }
    return false
  }, [entity, oldArgs, filter])

  useEffect(() => {
    if (
      hasNewArgs() && 
      !loading && !error &&
      !entryEquals(fetchedEntry, filter) &&
      !!entity.properties?.length
    ) {
      setLoading(true)
      getEntryData(
        entity.name,
        filter,
        entity.properties?.filter(p => p.layout?.visible?.entityPage).map(p => p.name)
      ).then(
        (data) => {
          setLoading(false)
          if (data && entryEquals(data, filter as IFilter)) {
            setFetchedEntry(data)
            setModifiedEntry(data)
            setError(false)
          } else {
            setError(true)
          }
        }
      ).catch(
        () => {
          setLoading(false)
          setError(true)
        }
      )
    } 
  }, [entity, loading, filter, error, fetchedEntry, hasNewArgs])

  const saveEntry = useCallback(() => {
    console.log(fetchedEntry, modifiedEntry, entryDiff(fetchedEntry, modifiedEntry))
    return saveEntryData(
      entity.name,
      entryDiff(fetchedEntry, modifiedEntry),
      filter
    )
  }, [entity, filter, modifiedEntry, fetchedEntry])

  return {
    entry: modifiedEntry,
    setEntry: setModifiedEntry,
    saveEntry,
    error,
  }
}