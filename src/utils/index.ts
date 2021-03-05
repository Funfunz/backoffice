import { IFilterState } from "reducers/filters"
import { IGQuery } from "services/graphql"

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function typeMatcher(filter: {
  value: unknown;
  valueType: string;
}) {
  switch (filter.valueType) {
    case 'string':
      return { _like: filter.value }
    default:
      return { _eq: filter.value }
  }
}

export function buildGQLFilter(selectedFilters: IFilterState['selectedFilters'])  {
  const filterProperties = Object.keys(selectedFilters)
  if (filterProperties.length) {
    return {
      _and: filterProperties.filter(
        (prop) => {
          return selectedFilters[prop].value !== undefined
        }
      ).map(
        (prop) => {
          return {
            [prop]: typeMatcher(selectedFilters[prop])
          }
        }
      )
    } as IGQuery['args']
  } else {
    return undefined
  }
}

export function existSelectedFilters(selectedFilters: IFilterState['selectedFilters']): boolean {
  const filterProperties = Object.keys(selectedFilters)
  if (filterProperties.length) {
    return filterProperties.some(
      (filter) => {
        return selectedFilters[filter].value !== undefined

      }
    )
  } else {
    return false
  }
}

export const desktopSize = 1120