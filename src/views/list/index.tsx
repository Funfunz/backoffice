import React, { FC, memo, useCallback, useState } from "react"
import { useHistory, useParams } from 'react-router-dom'

import { IEntryData } from "services/entry"
import { useEntries } from "hooks/useEntries"
import { useEntity } from "hooks/useEntity"
import { useFilter } from "hooks/useFilters"

import ActionButton from 'components/ActionButton'
import PageTitle from 'components/page-title'
import Message from 'components/message'
import Toolbar from 'components/toolbar'
import Filters from 'components/filters'
import { Table, TableHead, TableBody, TableRow } from 'components/Table'
import Pagination from "components/Pagination"

import classes from './style.module.scss'



const ListView: FC = () => {

  const history = useHistory()
  const { entityName = '' } = useParams<{ entityName: string }>()

  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(10)
  const entity = useEntity(entityName)
  const [filter] = useFilter(entity)
  const { entries, loading, error, total } = useEntries({ entity, filter, skip, take })
  

  const [showFilters, setShowFilters] = useState(false)
  const toggleFilters = useCallback(() =>{
    setShowFilters((value) => !value)
  }, [setShowFilters])

  const editEntry = useCallback((entry: IEntryData) => {
    history.push(`/edit/${entity?.getName()}/${entry[entity?.getPk() || 'id']}`)
  }, [history, entity])

  const deleteEntry = useCallback((entry: IEntryData) => {
    // TODO
  }, [])

  console.log({ take })

  return (
    <div className={classes.container}>
      <div className={classes.toolbar}>
        <PageTitle text={entity?.getLabel() || '...'}/>
        <Toolbar toggleFilters={toggleFilters}/>
      </div>
      {showFilters && (
        <Filters />
      )}
      <div className={classes.tableContainer}>
        {error 
          ? <Message error={!!error} text={error + ''} />
          : loading
            ? <Message loading />
            : entity && entries && <>
              <Table>
                <TableHead 
                  columns={entity.getProperties().map(
                    (propertyName) => ({
                      name: propertyName,
                      label: entity.getPropertyLabel(propertyName)
                    })
                  )}
                  actions={true}
                />
                <TableBody>
                  {entries.map(
                    (entry, index) => (
                      <TableRow
                        key={index}
                        columns={entity.getProperties()}
                        data={entry}
                        actions={[
                          <ActionButton
                            key={0}
                            type="edit"
                            onClick={editEntry.bind(null, entry)} />,
                          <ActionButton
                            key={1}
                            type="delete"
                            onClick={deleteEntry.bind(null, entry)} />
                        ]}
                      />
                    )
                  )}
                </TableBody>
              </Table>
              <Pagination
                take={take}
                setTake={setTake}
                total={total}
                skip={skip}
                setSkip={setSkip} 
              />
            </>
        }
      </div>
    </div>
  )
}

export default memo(ListView)
