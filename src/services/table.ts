import { dispatch,  } from 'reducers'
import * as graphql from 'services/graphql'
import {
  FETCH_ENTITIES_FULFILLED,
  FETCH_ENTITIES_PENDING,
  FETCH_ENTITIES_REJECTED,
  FETCH_ENTITY_PENDING,
  FETCH_ENTITY_FULFILLED,
  FETCH_ENTITY_REJECTED,
  FETCH_ENTITY_ENTRIES_FULFILLED,
  FETCH_ENTITY_ENTRIES_PENDING,
  FETCH_ENTITY_ENTRIES_REJECTED,
  SET_QUANTITY_OF_PAGES
} from 'reducers/entity'
import { FETCH_ENTRY_FULFILLED, FETCH_ENTRY_PENDING, FETCH_ENTRY_REJECTED } from 'reducers/entry'
import { IFilterState } from 'reducers/filters'
import { buildGQLFilter, existSelectedFilters } from 'utils'
import { FETCH_ENTITIES_COUNT, FETCH_ENTITIES_COUNT_LOADING } from 'reducers/entitiesCount'

export interface IProperty {
  name: string,
  searchable: boolean,
  model?: {
    isPk?: boolean,
    type: string,
    allowNull: boolean,
  },
  layout?: {
    label?: string,
    editField?: {
      type: 'text' | 'number' | 'password',
    },
    entityPage?: {
      filterable?: {
        type: string,
        inputType: 'checkbox'
        checked: unknown
        unChecked: unknown
      } | {
        type: string,
        inputType: 'select',
        content: {
          label: string,
          value: unknown,
        }[]
      },
    },
    visible?: {
      entityPage: boolean,
      detail: boolean,
      relation: boolean
    },
    [key: string]: unknown
  }
}

export interface IEntity {
  loading?: boolean,
  name: string,
  properties?: IProperty[],
  layout: {
    label: string,
  },
}

export interface PKS extends Record<string, string | number> {}

class Table {
  
  list() {
    dispatch({ type : FETCH_ENTITIES_PENDING })
    graphql.query({
      operation: 'entities',
      fields: ['name', 'layout'],
    }).then(
      (entities: any) => {
        if (entities) {
          dispatch({ 
            type: FETCH_ENTITIES_FULFILLED, 
            payload: entities,
          })
          return entities
        }
      }
    ).catch(
      (error: any) => {
        dispatch({ type: FETCH_ENTITIES_REJECTED })
        throw error
      }
    )
  }

  config(tableName: string) {
    dispatch({ type: FETCH_ENTITY_PENDING, payload: tableName })
    graphql.query({
      operation: 'config',
      fields: [tableName]
    }).then(
      (config: any) => {
        if (config[tableName]) {
          dispatch({ 
            type: FETCH_ENTITY_FULFILLED,
            payload: config[tableName],
          })
          return config[tableName]
        } else {
          throw new Error(`Table ${tableName} not found`)
        }
      }
    ).catch(
      (error) => {
        dispatch({ type: FETCH_ENTITY_REJECTED })
        throw error
      }
    )
  }

  getEntityItemsCount(table: IEntity, itemsByPage: number, selectedFilters?: IFilterState['selectedFilters']) {
    const query: graphql.IGQuery = {
      operation: `${table.name}Count`,
      args: {}
    }
    if (selectedFilters && existSelectedFilters(selectedFilters) && query.args) {
      query.args.filters = buildGQLFilter(selectedFilters as IFilterState['selectedFilters'])
    }
    return graphql.query(query).then(
      (allItems) => {
        if (allItems) {
          const itemsPagination = allItems / itemsByPage
          let pagination = []
          for (let i = 0; i < itemsPagination; i++) {
            pagination.push(i)
          }
          dispatch({
            type: SET_QUANTITY_OF_PAGES,
            payload: pagination
          })
          return pagination
        }
        return []
      }
    ).catch(
      (error) => {
        dispatch({
          type: FETCH_ENTITY_ENTRIES_REJECTED,
          payload: error,
        })
      }
    )
  }

  getTableData(
    entity: IEntity,
    options: {
      skip?: number
      take?: number
      currentPage?: number
      selectedFilters?: IFilterState['selectedFilters']
    } = {
      skip: 0,
      take: 10,
      currentPage: 0,
      selectedFilters: {}
    }
  ) {
    
    const query: graphql.IGQuery = {
      operation: entity.name,
      args: {
        skip: options.skip || 0,
        take: options.take || 10,
      },
      fields: entity.properties?.map(
          (property) => {
            return property.layout?.visible?.entityPage ? property.name : ''
          }
        ).filter(f => f) || [],
    }
    if (query.args && options.selectedFilters && Object.keys(options.selectedFilters).length > 0) {
      query.args.filter = buildGQLFilter(options.selectedFilters)
    }
    dispatch({ type: FETCH_ENTITY_ENTRIES_PENDING })
    return graphql.query(query).then(
      (data: any) => {
        if (data) {
          dispatch({ 
            type: FETCH_ENTITY_ENTRIES_FULFILLED,
            payload: { data, page: options.currentPage },
          })
          return data
        }
        dispatch({ 
          type: FETCH_ENTITY_ENTRIES_FULFILLED,
          payload: { data: [], page: 0 },
        })
        return []
      }
    ).catch(
      (error: any) => {
        dispatch({ type: FETCH_ENTITY_ENTRIES_REJECTED, payload: error })
      }
    )
  }

  getEntry(
    entity: IEntity,
    pks: PKS) {
    dispatch({ type: FETCH_ENTRY_PENDING })
    return graphql.query({
      operation: entity.name,
      args: this.filterByPks(pks),
      fields: entity.properties?.filter(
        (property) => property.layout?.visible?.detail
      ).map(
        (property) => property.name
      )
    }).then(
      (data: any) => {
        if (data) {
          dispatch({ 
            type: FETCH_ENTRY_FULFILLED,
            payload: data,
          })
          return data
        }
        dispatch({ 
          type: FETCH_ENTRY_FULFILLED,
          payload: [],
        })
        return []
      }
    ).catch(
      (error) => {
        const errorMessage = error.body
          ? error.body.errors
          : Array.isArray(error)
            ? error[0].message
            : error.message
        dispatch({ type: FETCH_ENTRY_REJECTED, payload: errorMessage  })
      }
    )
  }

  getEntitiesCount(entities: string[]) {
    dispatch({ 
      type: FETCH_ENTITIES_COUNT_LOADING, 
      payload: true,
    })

    return graphql.query(entities.map(
      (entityName) => ({
        operation: `${entityName}Count`
      })
    )).then(
      (data) => {
        const payload = entities.map(
          (entity) => ({
            entity: entity,
            count: data[`${entity}Count`]
          })
        )
        dispatch({ 
          type: FETCH_ENTITIES_COUNT, 
          payload,
        })
        return payload
      }
    )
  }

  private filterByPks(pks: PKS) {
    let resultFilter: { [key: string]: { _eq: number | string} } = {}
    Object.keys(pks).forEach(
      (pk) => {
        resultFilter[pk] = {
          '_eq': pks[pk],
        }
      }
    )
    return resultFilter
  }
}

const table = new Table()
export default table
