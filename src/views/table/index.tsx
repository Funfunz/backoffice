import React, { FC, memo, useCallback, useState } from "react"
import { useParams } from 'react-router-dom'
import Table from 'components/table'
import style from './style.module.scss'
import Message from 'components/message'
import Toolbar from 'components/toolbar'
import Filters from 'components/filters'
import PageTitle from 'components/page-title'
import { useEntries } from "hooks/useEntries"
import { useEntity } from "hooks/useEntity"
import { useFilter } from "hooks/useFilters"

export interface ITableProps {}

const ListView: FC = () => {
  
  const [showFilters, setShowFilters] = useState(false)

  const toggleFilters = useCallback(() =>{
    setShowFilters((value) => !value)
  }, [setShowFilters])

  const { tableName = '' } = useParams<{ tableName: string }>()

  const entity = useEntity(tableName)
  const [filter] = useFilter(entity)
  const { entries, loading, error } = useEntries(entity, filter)

  return (
    <div className={style.container}>
      <div className={style.toolbar}>
        <PageTitle text={entity?.getLabel() || '...'}/>
        <Toolbar toggleFilters={toggleFilters}/>
      </div>
      {showFilters && <Filters />}
      <div className={style.tableContainer}>
      {!error &&
        (loading ? (
          <Message loading />
        ) : (
          entity &&
          entries && (
            <Table
              entity={entity}
              entries={entries}
              loading={!!loading}
            />
          )
        ))}
      {error && (
        <Message error={!!error} text={error + ''} />
      )}
      </div>
    </div>
  )
}

export default memo(ListView)
