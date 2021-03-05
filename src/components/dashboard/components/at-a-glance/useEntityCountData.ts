import useTables from 'hooks/useTables'
import { useEffect, useState } from 'react'
import { useSelector } from 'reducers'
import { IEntityData } from 'reducers/entitiesCount'
import type { IEntity } from 'services/table'
import table from 'services/table'

export type entityItem = {
  name: string,
  label: string,
  count: number
}

let entitiesList: entityItem[] = []

function resetEntityList(entitiesCount: IEntityData[], tables: IEntity[]) {
  entitiesList = entitiesCount.map(
    (countResult) => {
      const foundEntity = tables.find(
        (entity) => {
          return entity.name === countResult.entity
        }
      )
      if (foundEntity) {
        return {
          name: foundEntity.name,
          label: foundEntity.layout.label,
          count: countResult.count
        }
      }
      return undefined
    }
  ).filter(i => i) as entityItem[]
}

function buildDefaultEntitiesList(tables: IEntity[], entitiesFilter: string[]) {
  if (!entitiesFilter.length) {
    return tables.map(
      (entity) => ({
        name: entity.name,
        label: entity.layout.label,
        count: 0
      })
    )
  }
  return tables.reduce<entityItem[]>(
    (previous, current) => {
      if(entitiesFilter.indexOf(current.name) > -1) {
        previous.push({
          name: current.name,
          label: current.layout.label,
          count: 0
        })
      }
      return previous
    },
    []
  )
}

export default function useEntityCountData(entitiesFilter: string[]) {

  const { tables, loadingTables } = useTables()
  const [ requestedEntitiesCount, setRequestedEntitiesCount ] = useState(false)
  const [ loadedEntitiesCount, setLoadedEntitiesCount ] = useState(false)
  const { entitiesCount, loadingEntitiesCount } = useSelector((state) => {
    return {
      entitiesCount: state.entitiesCount,
      loadingEntitiesCount: state.loadingEntitiesCount
    }
  })

  useEffect(() => {
    if (loadingEntitiesCount || loadingTables || requestedEntitiesCount) {
      if (requestedEntitiesCount && entitiesCount.length) {
        resetEntityList(entitiesCount, tables)
        
        setLoadedEntitiesCount(true)
      }
      return
    }
    if (!tables.length) {
      return
    }

    entitiesList = buildDefaultEntitiesList(tables, entitiesFilter)
    const entitiesNamesToCount = entitiesList.map(entity => entity.name)
    table.getEntitiesCount(entitiesNamesToCount)
    setRequestedEntitiesCount(true)
  }, [entitiesCount, entitiesFilter, loadingEntitiesCount, loadingTables, requestedEntitiesCount, tables])

  return { 
    entitiesList,
    loadedEntitiesCount,
  }
}