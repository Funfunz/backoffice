import { useCallback } from "react"
import { runForceUpdate, useForceUpdate } from "react-forceupdate"

import { useDebouncedValue } from "hooks/useDebounce"

import { IFilter } from "services/entry"
import Entity from "services/entity"

let filter: IFilter
let entityToFilter: Entity

interface IUseFilter {
  filter: IFilter,
  setFilter: (filterOrName: IFilter|string, value: any) => void
  debouncedFilter: IFilter
}

export function useFilter(entity?: Entity): IUseFilter {
  
  if (entity && entity?.getName() !== entityToFilter?.getName()) {
    entityToFilter = entity
    filter = {}
  }

  const setFilter = useCallback((filterOrName: IFilter|string, value: any) => {
    if (filterOrName) {
      if (typeof filterOrName === 'string') {
        if (value === "" || value === undefined || value === null) {
          delete filter[filterOrName]
          filter = { ...filter }
        } else {
          filter = {
            ...filter,
            [filterOrName]: value
          }
        }
        
      } else {
        filter = {
          ...filter,
          ...filterOrName
        }
      }
    } else {
      filter = {}
    }
    runForceUpdate('filters')
  }, [])

  useForceUpdate('filters')

  const debouncedFilter = useDebouncedValue(filter)

  return {
    filter,
    debouncedFilter,
    setFilter
  }
}