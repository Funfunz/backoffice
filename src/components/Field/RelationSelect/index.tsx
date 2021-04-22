import React, { FC, memo, useCallback, useState } from "react"
import { useEntity } from "hooks/useEntity"
import { useEntries } from "hooks/useEntries"
import Select, { ISelectField, ISelectFieldOption } from "components/Field/Select"

export interface IRelationSelectField extends ISelectField {
  relationEntityName?: string
}

const RelationSelectField: FC<IRelationSelectField> = (props) => {
  
  const isMulti = props.type === 'm:n' || props.type === 'n:m' || props.type === '1:n'

  const [search, setSearch] = useState<string>()
  const handleSearch = useCallback((newValue: string) => {
    setSearch(newValue)
  }, [])
  
  const entity = useEntity(props.relationEntityName)
  const { entries } = useEntries({ entity, view: 'relation', search })
  
  const pk = entity?.getPk() || 'id'
  const labelKey = entity?.getPropertyToBeUsedAsLabel() || 'name'

  const filter = props.value ? {
    [pk]: isMulti ? { _in: props.value } : props.value
  } : {}

  const { entries: selectedEntries } = useEntries({ 
    entity,
    view: 'relation',
    filter,
    request: Object.keys(filter).length > 0,
    take: 0
  })
  
  const mergedEntries = [
    ...entries,
    ...selectedEntries,
  ].filter((item, index, array) => {
    return item[pk] && index === array.findIndex((arrayItem) => {
      return arrayItem[pk] === item[pk]
    })
  })

  return (
    <Select
      onSearch={handleSearch}
      isMulti={isMulti}
      options={mergedEntries.map((entry) => {
        return {
          label: entry[labelKey],
          value: entry[pk],
        } as ISelectFieldOption
      })}
      {...props} 
    /> 
  )
}

export default memo(RelationSelectField)