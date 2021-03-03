import { useEffect } from "react"
import { useSelector } from "reducers"
import { IEntity } from "services/table"
import { getEntity } from 'services/entity'
import { IField, mapFieldComponents } from "utils/fields"

/*
 * To be used on Create, View and Edit page to render input fields
 */
export function useEntity(entityName: string): IEntity & { label: string, fields: IField[] } {
  const entity = useSelector((state) => state.tables.find(t => t.name === entityName))
  const loading = useSelector((state) => state.loadingTables || state.tables.find(t => t.name === entityName)?.loading)
  const error = useSelector((state) => state.error)
  
  useEffect(() => { 
    if ((entity?.name !== entityName || !entity?.properties?.length) && !loading && !error) {
      getEntity(entityName)
    } 
  }, [entityName, loading, error, entity])

  return entity
    ? { 
      ...entity,
      fields: mapFieldComponents(entity),
      label: entity.layout.label || entityName
    }
    : { 
      name: entityName,
      layout: { label: entityName },
      label: entityName, 
      properties: [],
      fields: []
    }
}