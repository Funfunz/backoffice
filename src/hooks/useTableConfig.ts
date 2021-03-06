import { useEffect } from 'react'
import { useSelector } from 'reducers'

import tableService, { IEntity, IProperty }  from 'services/table'
import { emptyTableConfig, emptyColumnConfig } from 'utils/tableConfig'

export class TableConfig {
  config: IEntity
  public properties: IProperty[]

  constructor(config?: IEntity) {
    this.config = config || emptyTableConfig
    this.properties = this.config.properties || []
  }

  name() {
    return this.config.name
  }

  title() {
    return this.config.layout.label || this.config.name
  }

  filters() {
    return this.properties.filter((property) => (
      property.layout?.entityPage?.filterable
    ))
  }

  pkColumn(): IProperty {
    return this.properties.find((c) => c.model && c.model.isPk) || emptyColumnConfig
  }

  titleColumn() {
    return this.properties.find((c) => c.layout && c.layout.isTitle) || emptyColumnConfig
  }

  itemPK(item: any) {
    const column = this.pkColumn()
    return Number(item[column.name])
  }

  itemTitle(item: any) {
    const column = this.titleColumn()
    return column && column.name
      ? item[column.name]
      : this.itemPK(item)
  }
}

export default function useTableConfig(tableName: string) {

  const table = useSelector((state) => {
    return state.tables.find((t) => {
      return t.name === tableName
    })
  })

  const loadingTables = table ? table.loading : true

  useEffect(() => {
    if (!table?.properties && !loadingTables) {
      tableService.config(tableName)
    }
  }, [table, loadingTables, tableName])

  return { 
    table: new TableConfig(table),
    loadingTableConfig: loadingTables,
  }
}