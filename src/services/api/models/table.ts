import api, { API } from 'services/api'
import { dispatch,  } from 'reducers'
import HttpError from '../HttpError'
import * as gql from 'gql-query-builder'
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
  private api: API
  
  constructor (api: API) {
    this.api = api
  }

  list() {
    dispatch({ type : FETCH_ENTITIES_PENDING })
    const graphQl = gql.query({
      operation: 'entities',
      fields: ['name', 'layout']
    })
    return this.api.post('/?', {
      body: JSON.stringify({
        query: graphQl.query,
        variables: null
      })
    }).then(
      (body: any) => {
        if (body.error) {
          throw body.error
        }
        if (body.data?.entities) {
          dispatch({ 
            type: FETCH_ENTITIES_FULFILLED, 
            payload: body.data.entities,
          })
          return body.data.entities
        }
      }
    ).catch(
      (error) => {
        dispatch({ type: FETCH_ENTITIES_REJECTED })
        throw error
      }
    )
  }

  config(tableName: string) {
    dispatch({ type: FETCH_ENTITY_PENDING, payload: tableName })
    const graphQl = gql.query({
      operation: 'config',
      fields: [tableName]
    })
    return this.api.post('/', {
      body: JSON.stringify({
        query: graphQl.query
      })
    }).then(
      (body) => {
        if (body.error) {
          throw body.error
        }
        if (body.data?.config && body.data?.config[tableName]) {
          dispatch({ 
            type: FETCH_ENTITY_FULFILLED,
            payload: body.data.config[tableName],
          })
          return body.data.config[tableName]
        } else {
          throw new HttpError({ status: 404 })
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
    console.log(selectedFilters)
    const queryName = `${table.name}Count`
    const filters = (selectedFilters && existSelectedFilters(selectedFilters))
      ? ` (${buildGQLFilter(selectedFilters as IFilterState['selectedFilters'])})`
      : ''
    const operation = `${queryName}${filters}`
    const graphQl = gql.query({
      operation,
    })
    return this.api
      .post('/', {
        body: JSON.stringify({
          query: graphQl.query,
        }),
      })
      .then((body) => {
        if (body.errors) {
          throw body.errors
        }
        if (body.data && body.data[queryName]) {
          const allItems = body.data[queryName]
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
      })
      .catch((errors) => {
        dispatch({
          type: FETCH_ENTITY_ENTRIES_REJECTED,
          payload: errors[0].message,
        })
      })
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
    let filter
    if (options.selectedFilters) {
      filter = buildGQLFilter(options.selectedFilters)
    }
    dispatch({ type: FETCH_ENTITY_ENTRIES_PENDING })
    const graphQl = gql.query({
      operation: `${entity.name} (skip: ${options.skip || 0}, take: ${options.take || 10}${filter ? ', ' + filter : ''})`,
      fields: [`${entity.properties?.map(
        (property) => property.layout?.visible?.entityPage ? property.name : undefined
      ).filter(f => f)}`]
    })
    return this.api.post('/', {
      body: JSON.stringify({
        query: graphQl.query
      })
    }).then(
      (body) => {
        console.log("body", body)
        if (body.errors) {
          throw body.errors
        }
        if (body.data && body.data[entity.name]) {
          const data = body.data[entity.name]
          dispatch({ 
            type: FETCH_ENTITY_ENTRIES_FULFILLED,
            payload: {data, page: options.currentPage},
          })
          return data
        }
        dispatch({ 
          type: FETCH_ENTITY_ENTRIES_FULFILLED,
          payload: {data: [], page: 0},
        })
        return []
      }
    ).catch(
      (errors) => {
        dispatch({ type: FETCH_ENTITY_ENTRIES_REJECTED, payload: errors[0].message })
      }
    )
  }

  getEntry(
    entity: IEntity,
    pks: PKS) {
    dispatch({ type: FETCH_ENTRY_PENDING })
    const graphQl = gql.query({
      operation: `${entity.name} (filter: ${this.filterByPks(pks)})`,
      fields: [`${entity.properties?.filter(
        (property) => property.layout?.visible?.detail
      ).map(
        (property) => property.name
      )}`]
    })
    return this.api.post('/', {
      body: JSON.stringify({
        query: graphQl.query
      })
    }).then(
      (body) => {
        if (body.errors) {
          throw body.errors
        }
        if (body.data && body.data[entity.name]) {
          const data = body.data[entity.name]
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

  private filterByPks(pks: PKS) {
    let resultFilter: string = ''
    Object.keys(pks).forEach(
      (pk) => {
        resultFilter += `{
          ${pk}: {
            _eq: ${pks[pk]}
          }
        }`
      }
    )
    return resultFilter
  }
}

const table = new Table(api)
export default table
