import { IFilterState } from "reducers/filters"

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function typeMatcher(filter: {
  value: unknown;
  valueType: string;
}) {
  switch (filter.valueType) {
    case 'string':
      return `_like: "${filter.value}"`
    default:
      return `_eq: ${filter.value}`
  }
}

export function buildGQLFilter(selectedFilters: IFilterState['selectedFilters']): string | undefined {
  const filterProperties = Object.keys(selectedFilters)
  if (filterProperties.length) {
    return `filter: {
      _and: [
        ${
          filterProperties.reduce(
          (previous, current) => {
            if (selectedFilters[current].value === undefined) {
              return previous
            }
            return previous + `{
              ${current}: {
                ${typeMatcher(selectedFilters[current])}
              }
            }`
          }, '')
        }
      ]
    }`
  } else {
    return undefined
  }
}

export const desktopSize = 1120