import { useCallback } from "react"
import { IFilter } from "services/entry"
import { IEntity } from "services/table"

let filter: IFilter
let entityToFilter: IEntity

export function useFilter(entity?: IEntity): [IFilter, (newFilter: IFilter) => void] {
  
  if (entity && entity?.name !== entityToFilter?.name) {
    entityToFilter = entity
    filter = {}
  }

  const setFilter = useCallback((newFilter: IFilter) => {
    if (newFilter) {
      filter = {
        ...filter,
        ...newFilter
      }
    } else {
      filter = {}
    }
    
  }, [])

  return [filter, setFilter]
}