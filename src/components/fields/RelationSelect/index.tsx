import { useEntity } from "hooks/useEntity"
import { useEntries } from "hooks/useEntries"
import React from "react"
import { FC, memo } from "react"
import Select, { ISelectField, ISelectFieldOption } from "../Select"

export interface IRelationSelectField extends ISelectField {
  relationEntityName?: string
}

const RelationSelectField: FC<IRelationSelectField> = (props) => {
  const entity = useEntity(props.relationEntityName)
  const { entries } = useEntries(entity, undefined, 'relation')
  return (
    <Select
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