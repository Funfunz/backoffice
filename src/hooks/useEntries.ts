import { useEffect, useState } from "react"
import { IEntity } from "services/entity"
import { getEntries } from "services/entries"
import { entryEquals, IEntryData, IFilter } from "services/entry"

/* Return list of entries for one entity based on a filter */
export function useEntries(entity: IEntity, filter?: IFilter): IEntryData[] {
  const [oldEntityName, setEntityName] = useState('')
  const [oldFilter, setFilter] = useState<IFilter>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [entries, setEntries] = useState<IEntryData[]>([])

  useEffect(() => {
    if (!loading && !error && entity.properties?.length && oldEntityName !== entity.name && !entryEquals(filter, oldFilter)) {
      setEntityName(entity.name)
      setFilter(filter)
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
  }, [filter, loading, error, setEntries, entity.properties, entity.name, oldFilter, oldEntityName])

  return entries
}