import { useCallback, useEffect, useState } from 'react'
import { IFields } from '../services/graphql'
import Entity from '../services/entity'
import { 
  entryDiff,
  entryEquals,
  filterMatch,
  getEntryData,
  IEntryData,
  IFilter,
  saveEntryData,
} from '../services/entry'

export interface IUseEntryArgs {
  entity?: Entity
  filter?: IFilter
  pk?: string | number
  fields?: IFields
  initialData?: IEntryData
}
export interface IUseEntry {
  entry: IEntryData,
  setEntry: React.Dispatch<React.SetStateAction<IEntryData>>,
  saveEntry: () => Promise<void>,
  error: boolean
}

/* Get entry data based on a filter */
export function useEntry({
  entity,
  filter,
  pk,
  fields,
  initialData = {},
}: IUseEntryArgs): IUseEntry {

  const [fetchedEntry, setFetchedEntry] = useState<IEntryData>(initialData)
  const [modifiedEntry, setModifiedEntry] = useState<IEntryData>(initialData)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  if (!filter) {
    filter = { [entity?.getPk() as string]: pk }
  }
  
  const [oldArgs, setNewArgs] = useState<{ entity?: string, filter?: IFilter }>({})

  const hasNewArgs = useCallback(() => {
    if (
      entity?.getName() !== oldArgs.entity ||
      !entryEquals(filter, oldArgs.filter)
    ) {
      setNewArgs({ entity: entity?.getName(), filter })
      return true
    }
    return false
  }, [entity, oldArgs, filter])

  useEffect(() => {
    if (
      hasNewArgs() && 
      !loading && !error &&
      !entryEquals(fetchedEntry, filter) &&
      entity
    ) {
      setLoading(true)
      getEntryData(entity, filter, fields).then((data) => {
        setLoading(false)
        if (data && filterMatch(data, filter as IFilter)) {
          setFetchedEntry(data)
          setModifiedEntry(data)
          setError(false)
        } else {
          setError(true)
        }
      }).catch(() => {
        setLoading(false)
        setError(true)
      })
    } 
  }, [entity, loading, filter, error, fetchedEntry, hasNewArgs, fields])

  const saveEntry = useCallback(() => {
    return saveEntryData(
      entity as Entity,
      entryDiff(fetchedEntry, modifiedEntry),
      filter,
    )
  }, [entity, filter, modifiedEntry, fetchedEntry])

  return {
    entry: modifiedEntry,
    setEntry: setModifiedEntry,
    saveEntry,
    error,
  }
}