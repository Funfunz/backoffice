import { useCallback, useEffect, useState } from "react"
import Entity from "services/entity"
import { getEntries } from "services/entries"
import { entryEquals, IEntryData, IFilter } from "services/entry"

export interface IUseEntries {
  entries: IEntryData[]
  error?: boolean
  loading?: boolean
}

/* Return list of entries for one entity based on a filter */
export function useEntries(entity?: Entity, filter?: IFilter, view: 'list' | 'relation' = 'list'): IUseEntries {

  const [entries, setEntries] = useState<IEntryData[]>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

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
      entity
    ) {
      setLoading(true)
      getEntries(
        entity,
        filter,
      ).then(
        (data) => {
          setLoading(false)
          if (data) {
            setEntries(data)
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
  }, [filter, loading, error, setEntries, entity, hasNewArgs, view])

  return { entries, error, loading }
}