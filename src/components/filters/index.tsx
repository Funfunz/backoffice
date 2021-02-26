import React, { FC, memo, useCallback } from 'react'
import Button from 'components/button'

import style from './style.module.scss'
import useTableConfig from 'hooks/useTableConfig'
import { useParams } from 'react-router-dom'

import { dispatch, useSelector } from '../../reducers/index'
import { CLEAR_SELECTED_FILTER, UPDATE_SELECTED_FILTER } from 'reducers/filters'
import type { IProperty } from 'services/table'

export interface IFiltersProps {
}

const updateFilters = (property: IProperty, value: unknown) => {
  dispatch({
    type: UPDATE_SELECTED_FILTER,
    payload: {
      propertyName: property.name,
      valueType: property.layout?.entityPage?.filterable?.type,
      value
    }
  })
}

const Filters: FC<IFiltersProps> = () => {
  const { tableName = '' } = useParams<any>()
  const {table, loadingTableConfig} = useTableConfig(tableName)
  const selectedFilters = useSelector(
    (state) => {
      return state.selectedFilters
    }
  )
  const updateFilterCallback = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, property: IProperty) => {
      if ((event.currentTarget as HTMLSelectElement).selectedOptions) {
        updateFilters(property, (event.currentTarget as HTMLSelectElement).selectedOptions[0].value)
      } else {
        updateFilters(property, (event.currentTarget as HTMLInputElement).checked
          ? (property.layout?.entityPage?.filterable as Record<string, unknown>).checked
          : undefined
        )
      }
    },
    []
  )

  const clearFiltersCallback = useCallback(
    () => {
      dispatch({
        type: CLEAR_SELECTED_FILTER,
      })
    },
    []
  )

  if (loadingTableConfig) {
    return null
  }
  const filters = table.filters()
  return (
    <div className={style.filters}>
      <div className={style.filtersContainer}>
        {filters.map(
          (property) => (
            <div className={style.filter}>
              <span>{property.layout?.label}</span>
              {property.layout?.entityPage?.filterable?.inputType === 'select' && (
                <select
                  onChange={(event) => {updateFilterCallback(event, property)}}
                >
                  <option selected={selectedFilters[property.name]?.value === 'undefined' || selectedFilters[property.name]?.value === undefined} value={'undefined'}>Not selected</option>
                  {property.layout?.entityPage.filterable.content.map(
                    ({label, value}) => (
                      <option
                        value={value as string}
                        selected={selectedFilters[property.name] === value}
                      >
                        {label}
                      </option>
                    )
                  )}
                </select>
              )}
              {property.layout?.entityPage?.filterable?.inputType === 'checkbox' && (
                <input
                  checked={selectedFilters[property.name]?.value === property.layout.entityPage.filterable.checked}
                  onChange={
                    (event) => {
                      updateFilterCallback(event, property)
                    }
                  }
                  type='checkbox'
                  value={(property.layout.entityPage?.filterable.checked as boolean).toString()}
                />
              )}
            </div>
          )
        )}
      </div>
      <div className={style.actions}>
        <Button label="CLEAR FILTERS" onClick={clearFiltersCallback} style={{backgroundColor: "transparent", fontSize: "12px", color: "#818181", border: 'none', padding: '10px 30px'}}/>
        {/*<Button label="APPLY" onClick={() => {}} style={{backgroundColor: "#DCA50B", fontSize: "12px", color: "white", border: 'none', padding: '10px 30px'}}/>*/}
      </div>
    </div>
  )
}

export default memo(Filters)