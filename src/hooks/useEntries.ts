import { useCallback, useEffect, useState } from "react"
import Entity from "services/entity"
import { countEntries, getEntries } from "services/entries"
import { entryEquals, IEntryData, IFilter } from "services/entry"

export interface IUseEntriesArgs {
  entity?: Entity
  filter?: IFilter
  view?: Parameters<Entity['getProperties']>[0]
  skip?: number
  take?: number
}
export interface IUseEntriesRet {
  entries: IEntryData[]
  error?: boolean
  loading?: boolean
  total: number
}

/* Return list of entries for one entity based on a filter */
export function useEntries({
  entity,
  filter = {},
  view = 'list',
  skip = 0,
  take = 10,
}: IUseEntriesArgs): IUseEntriesRet {

  const [entries, setEntries] = useState<IEntryData[]>([])
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [oldArgs, setNewArgs] = useState<{ entity?: string, filter?: IFilter, skip?: number, take?: number }>({})

  const hasNewArgs = useCallback(() => {
    if (
      entity?.getName() !== oldArgs.entity ||
      !entryEquals(filter, oldArgs.filter) ||
      skip !== oldArgs.skip ||
      take !== oldArgs.take
    ) {
      setNewArgs({ entity: entity?.getName(), filter, skip, take })
      return true
    }
    return false
  }, [entity, oldArgs, filter, skip, take])

  useEffect(() => {
    if (
      hasNewArgs() &&
      !loading && !error && 
      entity
    ) {
      setLoading(true)
      Promise.all([
        getEntries({ entity, filter, skip, take }),
        countEntries({ entity, filter })
      ]).then(
        ([data, total]) => {
          setLoading(false)
          if (data) {
            setEntries(data)
            setTotal(total)
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
  }, [filter, loading, error, setEntries, entity, hasNewArgs, view, skip, take])

  return { entries, error, loading, total }
}