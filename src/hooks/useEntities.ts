import { useEffect } from "react"
import { useForceUpdate, runForceUpdate } from 'react-forceupdate'
import { listEntities } from "services/entities"

let entities: { name: string, label: string }[] = []
let loading = false

export function useEntities(): { name: string, label: string }[] {
  
  useEffect(() => {
    if (entities.length === 0 && !loading) {
      loading = true
      listEntities().then((fetchedEntities) => {
        // force all hooks/components that subscribed `entities` to re-render
        entities = fetchedEntities
        loading = false
        runForceUpdate('entities')
      })
    }
  }, [])

  // subscribe to `entities` so that we can re-render if there are changes
  useForceUpdate('entities')

  return entities
}