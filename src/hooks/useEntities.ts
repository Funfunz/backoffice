import { useEffect } from 'react'
import { listEntities } from '../services/entities'
import { useForceUpdate } from './useForceUpdate'

let entities: { name: string, label: string }[] = []
let loading: boolean

export function useEntities(filter: string = '') {
  const forceUpdate = useForceUpdate()
  useEffect(() => {
    if (entities.length === 0 && !loading) {
      loading = true
      listEntities().then((fetchedEntities) => {
        // force all hooks/components that subscribed `entities` to re-render
        entities = fetchedEntities
        loading = false
        forceUpdate()
      })
    }
  }, [forceUpdate])

  return {
    entities: entities.filter(e => e.name.toLowerCase().includes(filter.toLowerCase())),
    loading: loading === undefined ? true : loading,
  }
}