import { IAction, IBaseState } from "recost"
import { IEntity } from "services/api/models/table"
import { paginationConfig } from "utils/tableConfig"
import type { TEntry } from "./entry"

export const FETCH_ENTITIES_PENDING = 'FETCH_ENTITIES_PENDING'
export const FETCH_ENTITIES_FULFILLED = 'FETCH_ENTITIES_FULFILLED'
export const FETCH_ENTITIES_REJECTED = 'FETCH_ENTITIES_REJECTED'
export const FETCH_ENTITY_PENDING = 'FETCH_ENTITY_PENDING'
export const FETCH_ENTITY_FULFILLED = 'FETCH_ENTITY_FULFILLED'
export const FETCH_ENTITY_REJECTED = 'FETCH_ENTITY_REJECTED'
export const FETCH_ENTITY_ENTRIES_PENDING = 'FETCH_ENTITY_ENTRIES_PENDING'
export const FETCH_ENTITY_ENTRIES_FULFILLED = 'FETCH_ENTITY_ENTRIES_FULFILLED'
export const FETCH_ENTITY_ENTRIES_REJECTED = 'FETCH_ENTITY_ENTRIES_REJECTED'
export const SET_QUANTITY_ITEMS_BY_PAGE = 'SET_QUANTITY_ITEMS_BY_PAGE'
export const SET_QUANTITY_OF_PAGES = 'SET_QUANTITY_OF_PAGES'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

export interface IEntityState extends IBaseState {
  tables: IEntity[]
  loadingTables: boolean
  tableData?: TEntry[]
  errorTableData?: string
  loadingTableData: boolean
  error?: boolean
  itemsByPage: number
  page: number
  pagination: [],
  forceTableReload: boolean
}

export const initialState: IEntityState = {
  tables: [],
  loadingTables: false,
  loadingTableData: false,
  error: false,
  itemsByPage: paginationConfig.itemsPerPage.default,
  page: 0,
  pagination: [],
  forceTableReload: false
}

export function entityReducer(state: IEntityState, action: IAction) {
  let tables = state.tables || []
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.payload,
        forceTableReload: true,
      }
    case SET_QUANTITY_OF_PAGES:
      return {
        ...state,
        pagination: action.payload
      }
    case SET_QUANTITY_ITEMS_BY_PAGE:
      return {
        ...state,
        itemsByPage: action.payload,
        page: 0,
        forceTableReload: true,
      }
    case FETCH_ENTITY_ENTRIES_PENDING:
      return {
        ...state,
        tableData: undefined,
        loadingTableData: true,
        errorTableData: undefined,
        forceTableReload: false,
      }
    case FETCH_ENTITY_ENTRIES_FULFILLED:
      return {
        ...state,
        loadingTableData: false,
        tableData: action.payload.data,
        page: action.payload.page,
        errorTableData: undefined
      }
    case FETCH_ENTITY_ENTRIES_REJECTED:
      return {
        ...state,
        loadingTableData: false,
        tableData: [],
        errorTableData: action.payload,
      }
    case FETCH_ENTITIES_PENDING:
      return {
        ...state,
        loadingTables: true,
      }
    
    case FETCH_ENTITY_PENDING:
      tables = tables.map((table: IEntity) => ({
        ...table,
        loading: table.name === action.payload
          ? true
          : table.loading,
      }))
      return {
        ...state,
        tables,
      }

    case FETCH_ENTITIES_FULFILLED:
      (action.payload || []).forEach((table: IEntity) => {
        if (!tables.find((t: IEntity) => t.name === table.name)) {
          tables.push({
            ...table,
            loading: false
          })
        }
      })
      return {
        ...state,
        loadingTables: false,
        tables,
      }

    case FETCH_ENTITY_FULFILLED:
      if (tables.length === 0) {
        tables = [action.payload]
      }
      tables = tables.map((table: IEntity) => {
        return table.name === action.payload.name
          ? { ...table, loading: false, ...action.payload }
          : { ...table, loading: false }
      })
      return {
        ...state,
        loadingTables: false,
        tables,
      }

    case FETCH_ENTITY_REJECTED:
    case FETCH_ENTITIES_REJECTED:
      return {
        ...state,
        loadingTables: false,
        error: true,
      }

    default:
      return state
  }
}