import { useEntity } from "hooks/useEntity"
import { useEntries } from "hooks/useEntries"
import React from "react"
import { FC, memo } from "react"
import { IRelation } from "services/entity"
import Select, { ISelectField, ISelectFieldOption } from "../Select"

export interface IRelationSelectField extends ISelectField {
  relation?: IRelation
}

const RelationSelectField: FC<IRelationSelectField> = (props) => {
  const entity = useEntity(props.relation?.remoteTable || '')
  const { entries } = useEntries(entity)
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