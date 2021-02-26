import { useCallback, useEffect } from "react"
import { useSelector } from "reducers"

export interface IFilter {
  [key: string]: string | number | boolean
}
export interface IEntryData {
  [key: string]: string | number | boolean
}

export async function getEntryData(entityName: string, filter: IFilter): Promise<IEntryData> {
  // TODO: get entry data from graphql
  return {}
}

export async function saveEntryData(entityName: string, filter: IFilter, data: any): Promise<void> {
  // TODO: save entry data to graphql
}

export function entryEquals(entry: any, filter: IFilter) {
  return entry && filter && Object.keys(filter).reduce(
    (result, key) => {
      return result && entry[key] === filter[key]
    },
    true as boolean
  )
}

export function useEntry(entityName: string, filter: IFilter) {
  const entry = useSelector((state) => state.entry) 
  const loading = useSelector((state) => state.loadingEntry)
  const error = useSelector((state) => state.errorEntry)
  
  useEffect(() => {
    if (entryEquals(entry, filter) && !loading && !error) {
      getEntryData(entityName, filter)
    } 
  }, [entityName, filter, loading, error, entry])

  const setEntry = useCallback((data) => {
    saveEntryData(entityName, filter, data)
  }, [entityName, filter])
  
  return [entry, setEntry]
}