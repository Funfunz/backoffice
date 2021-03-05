import { useEffect } from "react"
import { useForceUpdate, runForceUpdate } from 'react-forceupdate'
import { listEntities } from "services/entities"
import { IEntity } from "services/table"

let entities: IEntity[] = []
let loading = false

export function useEntities(): IEntity[] {
  
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