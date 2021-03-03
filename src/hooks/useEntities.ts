import { useEffect } from "react"
import { useSelector } from "reducers"
import { listEntities } from "services/entities"
import { IEntity } from "services/table"

/*
 * To be used on sidebar to render entity list
 */
export function useEntities(): IEntity[] {
  const entities = useSelector((state) => state.tables)
  const loading = useSelector((state) => state.loadingTables)
  const error = useSelector((state) => state.error)
  
  useEffect(() => {
    if ((!entities || entities.length === 0) && !loading && !error) {
      listEntities()
    } 
  }, [loading, error, entities])

  return entities
}