import { useEffect, useState } from "react"
import { useSelector } from "reducers"
import { IEntity } from "services/entity"
import { getEntries } from "services/entries"
import { IEntryData, IFilter } from "services/entry"


export function useEntries(entity: IEntity, filter?: IFilter): IEntryData[] {
  const loading = useSelector((state) => state.loadingEntry)
  const [error, setError] = useState(false)
  const [entries, setEntries] = useState<IEntryData[]>([])

  useEffect(() => {
    if (!loading && !error && entity.properties?.length) {
      getEntries(
        entity.name,
        filter,
        entity.properties?.filter(p => {
          return p.model?.isPk || p.layout?.visible?.relation
        }).map(p => p.name)
      ).then(
        (data) => {
          if (data) {
            setEntries(data)
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
  }, [filter, loading, error, setEntries, entity.properties, entity.name])

  return entries
}