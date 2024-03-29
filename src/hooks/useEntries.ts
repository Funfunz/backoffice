import { useCallback, useEffect, useState } from 'react'
import Entity from '../services/entity'
import { countEntries, getEntries, deleteEntries } from '../services/entries'
import { entryEquals, IEntryData, IFilter } from '../services/entry'

export interface IUseEntriesArgs {
  entity?: Entity
  filter?: IFilter
  view?: Parameters<Entity['getProperties']>[0]
  skip?: number
  take?: number
  request?: boolean
  search?: string
}
export interface IUseEntriesRet {
  entries: IEntryData[]
  error?: boolean
  loading?: boolean
  total: number
  deleteEntry: (pk: number | string) => void
}

/* Return list of entries for one entity based on a filter */
export function useEntries({
  entity,
  filter = {},
  view = 'list',
  skip = 0,
  take = 10,
  request = true,
  search,
}: IUseEntriesArgs): IUseEntriesRet {

  const [entries, setEntries] = useState<IEntryData[]>([])
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [oldArgs, setNewArgs] = useState<{ entity?: string, filter?: IFilter, skip?: number, take?: number, search?: string }>({})

  const fetchEntries = useCallback(() => {
    if (!entity || !request) return
    setLoading(true)
    return Promise.all([
      getEntries({ entity, filter, skip, take, view, search }),
      countEntries({ entity, filter }),
    ]).then(([data, total]) => {
      setLoading(false)
      if (data) {
        setEntries(data)
        setTotal(total)
      } else {
        setError(true)
      }
    }).catch(() => {
      setLoading(false)
      setError(true)
    })
  }, [entity, filter, skip, view, take, request, search])

  const deleteEntry = useCallback((pk: string | number) => {
    if (entity) {
      return deleteEntries(entity, {
        [entity?.getPk() || 'id']: pk,
      }).then(fetchEntries)
    }
  }, [entity, fetchEntries])

  const hasNewArgs = useCallback(() => {
    if (
      entity?.getName() !== oldArgs.entity ||
      !entryEquals(oldArgs.filter, filter) ||
      skip !== oldArgs.skip ||
      take !== oldArgs.take ||
      search !== oldArgs.search
    ) {
      setNewArgs({ entity: entity?.getName(), filter: { ...filter }, skip, take, search })
      return true
    }
    return false
  }, [entity, oldArgs, filter, skip, take, search])

  useEffect(() => {
    if (hasNewArgs() && !error) {
      fetchEntries()
    }
  }, [loading, error, hasNewArgs, fetchEntries])

  return { entries, error, loading, total, deleteEntry }
}