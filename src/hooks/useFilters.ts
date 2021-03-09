import { useCallback } from "react"
import { IFilter } from "services/entry"
import Entity from "services/entity"

let filter: IFilter
let entityToFilter: Entity

export function useFilter(entity?: Entity): [IFilter, (newFilter: IFilter) => void] {
  
  if (entity && entity?.getName() !== entityToFilter?.getName()) {
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