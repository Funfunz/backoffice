import { useCallback, useEffect, useState } from "react"
import { IEntity } from "services/entity"
import { getEntries } from "services/entries"
import { entryEquals, IEntryData, IFilter } from "services/entry"

/* Return list of entries for one entity based on a filter */
export function useEntries(entity: IEntity, filter?: IFilter): IEntryData[] {

  const [entries, setEntries] = useState<IEntryData[]>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

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
      entity.properties?.length
    ) {
      setLoading(true)
      getEntries(
        entity.name,
        filter,
        entity.properties?.filter(p => {
          return p.model?.isPk || p.layout?.visible?.relation
        }).map(p => p.name)
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
  }, [filter, loading, error, setEntries, entity, hasNewArgs])

  return entries
}