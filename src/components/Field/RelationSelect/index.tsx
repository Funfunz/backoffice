import React, { FC, memo, useEffect } from "react"
import { useEntity } from "hooks/useEntity"
import { useEntries } from "hooks/useEntries"
import Select, { ISelectField, ISelectFieldOption } from "components/Field/Select"

export interface IRelationSelectField extends ISelectField {
  relationEntityName?: string
}

const RelationSelectField: FC<IRelationSelectField> = (props) => {
  const entity = useEntity(props.relationEntityName)
  const isMulti = props.type === 'm:n' || props.type === 'n:m'
  const { entries } = useEntries({ entity, view: 'relation' })
  useEffect(() => {
    if (props.onChange && Array.isArray(props.value) && typeof props.value[0] === 'object') {
      props.onChange(props.name, props.value.map((entry: any) => {
        return entry?.[entity?.getPk() || 'id']
      }))
    }
  }, [props, entity])
  return (
    <Select
      isMulti={isMulti}
      options={entries.map((entry) => {
        return {
          label: entry[entity?.getPropertyToBeUsedAsLabel() || 'name'],
          value: entry[entity?.getPk() || 'name'],
        } as ISelectFieldOption
      }).filter((option) => {
        return option.value
      })}
      {...props} 
    /> 
  )
}

export default memo(RelationSelectField)