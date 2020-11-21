import api, { API } from 'services/api'
import { dispatch } from 'reducers'
import HttpError from '../HttpError'
import {
  FETCH_TABLES_FULFILLED,
  FETCH_TABLES_PENDING,
  FETCH_TABLE_PENDING,
  FETCH_TABLE_FULFILLED,
  FETCH_TABLE_REJECTED,
  FETCH_TABLES_REJECTED,
  FETCH_TABLE_ENTRIES_FULFILLED,
  FETCH_TABLE_ENTRIES_PENDING,
  FETCH_TABLE_ENTRIES_REJECTED
} from 'reducers/table'
import { FETCH_ENTRY_FULFILLED, FETCH_ENTRY_PENDING, FETCH_ENTRY_REJECTED } from 'reducers/entry'

export interface IColumn {
  name: string,
  searchable: boolean,
  model?: {
    isPk?: boolean,
    type: string,
    allowNull: boolean,
  },
  layout: {
    label?: string,
    [key: string]: unknown
  }
  visible: {
    list: boolean,
    detail: boolean,
    relation: boolean
  },
}

export interface ITable {
  loading?: boolean,
  name: string,
  properties?: IColumn[],
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
    dispatch({ type : FETCH_TABLES_PENDING })
    return this.api.post('/?', {
      body: JSON.stringify({
        query: `query {
          entities {
            name
            layout
          }
        }`,
        variables: null
      })
    }).then(
      (body: any) => {
        if (body.error) {
          throw body.error
        }
        if (body.data?.entities) {
          dispatch({ 
            type: FETCH_TABLES_FULFILLED, 
            payload: body.data.entities,
          })
          return body.data.entities
        }
      }
    ).catch(
      (error) => {
        dispatch({ type: FETCH_TABLES_REJECTED })
        throw error
      }
    )
  }

  config(tableName: string) {
    dispatch({ type: FETCH_TABLE_PENDING, payload: tableName })
    return this.api.post('/', {
      body: JSON.stringify({
        query: `query {
          config {
            ${tableName}
          }
        }`
      })
    }).then(
      (body) => {
        if (body.error) {
          throw body.error
        }
        if (body.data?.config && body.data?.config[tableName]) {
          dispatch({ 
            type: FETCH_TABLE_FULFILLED,
            payload: body.data.config[tableName],
          })
          return body.data.config[tableName]
        } else {
          throw new HttpError({ status: 404 })
        }
      }
    ).catch(
      (error) => {
        dispatch({ type: FETCH_TABLE_REJECTED })
        throw error
      }
    )
  }

  getTableData(
    table: ITable,
    options: {
      skip?: number
      take?: number
    } = {
      skip: 0,
      take: 10
    }) {
    dispatch({ type: FETCH_TABLE_ENTRIES_PENDING })
    return this.api.post('/', {
      body: JSON.stringify({
        query: `query {
          ${table.name} (skip: ${options.skip || 0}, take: ${options.take || 10}){
            ${table.properties?.map(
              (column) => column.visible?.list && column.name
            )}
          }
        }`
      })
    }).then(
      (body) => {
        if (body.errors) {
          throw body.errors
        }
        if (body.data && body.data[table.name]) {
          const data = body.data[table.name]
          dispatch({ 
            type: FETCH_TABLE_ENTRIES_FULFILLED,
            payload: data,
          })
          return data
        }
        dispatch({ 
          type: FETCH_TABLE_ENTRIES_FULFILLED,
          payload: [],
        })
        return []
      }
    ).catch(
      (errors) => {
        dispatch({ type: FETCH_TABLE_ENTRIES_REJECTED, payload: errors[0].message })
      }
    )
  }

  getEntry(
    table: ITable,
    pks: PKS) {
    dispatch({ type: FETCH_ENTRY_PENDING })
    return this.api.post('/', {
      body: JSON.stringify({
        query: `query {
          ${table.name} (filter: ${this.filterByPks(pks)}){
            ${table.properties?.filter(
              (column) => column.visible.detail
            ).map(
              (column) => column.name
            )}
          }
        }`
      })
    }).then(
      (body) => {
        if (body.errors) {
          throw body.errors
        }
        if (body.data && body.data[table.name]) {
          const data = body.data[table.name]
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
