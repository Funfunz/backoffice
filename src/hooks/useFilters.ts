import { useCallback } from 'react'

import { useDebouncedValue } from './useDebounce'

import { IFilter } from '../services/entry'
import Entity from '../services/entity'
import { useForceUpdate } from './useForceUpdate'

let filter: IFilter
let entityToFilter: Entity

interface IUseFilter {
  filter: IFilter,
  clearFilters: () => void
  setFilter: (filterOrName: IFilter|string, value: any) => void
  debouncedFilter: IFilter
}

export function useFilter(entity?: Entity): IUseFilter {
  const forceUpdate = useForceUpdate()
  const [debouncedFilter, setDebouncedFilter] = useDebouncedValue(filter)

  if (entity && entity?.getName() !== entityToFilter?.getName()) {
    entityToFilter = entity
    filter = {}
    setDebouncedFilter(filter)
  }

  const setFilter = useCallback((filterOrName: IFilter|string, value: any) => {
    if (typeof filterOrName === 'string') {
      if (value === '' || value === undefined || value === null) {
        delete filter[filterOrName]
        filter = { ...filter }
      } else {
        filter = {
          ...filter,
          [filterOrName]: value,
        }
      }
      
    } else {
      filter = {
        ...filter,
        ...filterOrName,
      }
    }
    forceUpdate()
  }, [forceUpdate])

  const clearFilters = useCallback(() => {
    filter = {}
    forceUpdate()
  }, [forceUpdate])

  return {
    filter,
    debouncedFilter,
    setFilter,
    clearFilters,
  }
}