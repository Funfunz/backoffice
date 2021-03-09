import React, { FC, memo } from "react"
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

const ListView: FC = () => {

  const { entityName = '' } = useParams<{ entityName: string }>()
  const entity = useEntity(entityName)
  const {skip, setSkip, take, setTake } = usePagination()
  const {filter, setFilter, debouncedFilter } = useFilter(entity)
  const { entries, loading, error, total } = useEntries({ entity, filter: debouncedFilter, skip, take })

  return (
    <div className={classes.container}>
      <div className={classes.toolbar}>
        <PageTitle text={entity?.getLabel() || '...'}/>
        <Filters filters={debouncedFilter}>
          <Grid>
          {mapFieldComponents(entity).filter(f => !f.props.readOnly && f.props.type !== 'password').map(
            ({ Component, props }, index) =>
              <Column size={4} key={index}>
                <Component
                  {...props} 
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
                            navigateTo={`/edit/${entity?.getName()}/${entry[entity?.getPk() || 'id']}`}
                          />,
                          <ActionButton
                            key={1}
                            type="delete"
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
  )
}

export default memo(ListView)
