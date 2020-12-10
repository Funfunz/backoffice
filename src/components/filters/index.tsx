import React, { FC, memo, useCallback } from 'react'
import Button from 'components/button'

import style from './style.module.scss';
import useTableConfig from 'hooks/useTableConfig';
import { useParams } from 'react-router-dom';

import { dispatch, useSelector } from '../../reducers/index'

export interface IFiltersProps {
}

const updateFilters = (propertyName: string, value: unknown) => {
  dispatch({
    type: 'UPDATE_SELECTED_FILTER',
    payload: {
      propertyName,
      value
    }
  })
}

const Filters: FC<IFiltersProps> = () => {
  const { tableName = '' } = useParams<any>();
  const {table, loadingTableConfig} = useTableConfig(tableName)
  const selectedFilters = useSelector(
    (state) => {
      return state.selectedFilters
    }
  )
  const callback = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, propertyName: string) => {
      if ((event.currentTarget as HTMLSelectElement).selectedOptions) {
        updateFilters(propertyName, (event.currentTarget as HTMLSelectElement).selectedOptions[0].value)
      }
      updateFilters(propertyName, (event.currentTarget as HTMLInputElement).checked)
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
              <span>{property.layout.label}</span>
              {property.layout.entityPage?.filterable?.type === 'enum' && (
                <select
                  onChange={(event) => {callback(event, property.name)}}
                >
                  <option selected={selectedFilters[property.name] === undefined}>Not selected</option>
                  {property.layout.entityPage.filterable.content.map(
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
              {property.layout.entityPage?.filterable?.type === 'boolean' && (
                <input
                  checked={selectedFilters[property.name] === property.layout.entityPage?.filterable?.checked}
                  onChange={
                    (event) => {
                      callback(event, property.name)
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
        <Button label="CANCEL" onClick={() => {}} style={{backgroundColor: "transparent", fontSize: "12px", color: "#818181", border: 'none', padding: '10px 30px'}}/>
        <Button label="APPLY" onClick={() => {}} style={{backgroundColor: "#DCA50B", fontSize: "12px", color: "white", border: 'none', padding: '10px 30px'}}/>
      </div>
    </div>
  )
}

export default memo(Filters)