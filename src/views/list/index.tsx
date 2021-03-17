import React, { FC, memo, useCallback, useState } from "react"
import { useParams } from 'react-router-dom'

import { usePagination } from "hooks/usePagination"
import { useEntries } from "hooks/useEntries"
import { useEntity } from "hooks/useEntity"
import { useFilter } from "hooks/useFilters"

import ActionButton from 'components/ActionButton'
import PageTitle from 'components/PageTitle'
import Message from 'components/Message'
import Button from 'components/Button'
import { Table, TableHead, TableBody, TableRow } from 'components/Table'
import Pagination from "components/Pagination"
import Filters from "components/Filters"

import classes from './style.module.scss'
import { mapFieldComponents } from "utils/fields"
import { Column, Grid } from "components/Grid"
import Modal from "components/Modal"

const ListView: FC = () => {

  const { entityName = '' } = useParams<{ entityName: string }>()
  const entity = useEntity(entityName)
  const {skip, setSkip, take, setTake } = usePagination()
  const {filter, setFilter, debouncedFilter } = useFilter(entity)
  const { entries, loading, error, total, deleteEntry } = useEntries({ entity, filter: debouncedFilter, skip, take })

  const [toDelete, setToDelete] = useState<number | string | undefined>(undefined)
  const deleteRow = useCallback(() => {
    if(toDelete) {
      deleteEntry(toDelete)
      setToDelete(undefined)
    }
  }, [deleteEntry, setToDelete, toDelete])
  const closeModal = useCallback(() => setToDelete(undefined), [])

  return <>
    <Modal 
      visible={toDelete !== undefined}
      title="Delete entry?"
      description={`${entries.find(e => toDelete && e[entity?.getPk() || 'id'] === toDelete)?.[entity?.getPropertyToBeUsedAsLabel() || 'id']}`}
      onClose={closeModal}
      actions={[
        <ActionButton key={0} type="goback" onClick={closeModal} />,
        <ActionButton key={1} type="delete" onClick={deleteRow} />,
      ]}
    />
    <div className={classes.container}>
      <div className={classes.toolbar}>
        <PageTitle text={entity?.getLabel() || '...'}/>
        <Filters filters={debouncedFilter}>
          <Grid>
          {mapFieldComponents(entity, 'filter').map(
            ({ Component, props }, index) =>
              <Column size={4} key={index}>
                <Component
                  {...props}
                  readOnly={false}
                  onChange={setFilter}
                  value={filter[props.name] as string || ''}
                />
              </Column>
          )}
          </Grid>
        </Filters>
        <div className={classes.toolbarSpacer}></div>
        <Button
          navigateTo={`/new/${entityName}`}
          prefix={<i className="fas fa-plus"></i>}
          label="NEW"
          color='primary'
        />
      </div>
      <div className={classes.tableContainer}>
        {error 
          ? <Message error={!!error} text={error + ''} />
          : loading
            ? <Message loading />
            : entity && entries && <>
              <Table>
                <TableHead 
                  columns={entity.getProperties('list').map(
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
                          <ActionButton key={0}
                            type="view"
                            navigateTo={`/view/${entity?.getName()}/${entry[entity?.getPk() || 'id']}`}
                          />,
                          <ActionButton key={1}
                            type="edit"
                            navigateTo={`/edit/${entity?.getName()}/${entry[entity?.getPk() || 'id']}`}
                          />,
                          <ActionButton key={2}
                            type="delete"
                            onClick={() => setToDelete(entry[entity?.getPk() || 'id'] as number | string)}
                          />
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
  </>
}

export default memo(ListView)
