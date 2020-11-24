import { IAction, IBaseState } from "recost"
import { ITable } from "services/api/models/table"
import type { TEntry } from "./entry"

export const FETCH_TABLES_PENDING = 'FETCH_TABLES_PENDING'
export const FETCH_TABLES_FULFILLED = 'FETCH_TABLES_FULFILLED'
export const FETCH_TABLES_REJECTED = 'FETCH_TABLES_REJECTED'
export const FETCH_TABLE_PENDING = 'FETCH_TABLE_PENDING'
export const FETCH_TABLE_FULFILLED = 'FETCH_TABLE_FULFILLED'
export const FETCH_TABLE_REJECTED = 'FETCH_TABLE_REJECTED'
export const FETCH_TABLE_ENTRIES_PENDING = 'FETCH_TABLE_ENTRIES_PENDING'
export const FETCH_TABLE_ENTRIES_FULFILLED = 'FETCH_TABLE_ENTRIES_FULFILLED'
export const FETCH_TABLE_ENTRIES_REJECTED = 'FETCH_TABLE_ENTRIES_REJECTED'
export const SET_QUANTITY_ITEMS_BY_PAGE = 'SET_QUANTITY_ITEMS_BY_PAGE'
export const SET_QUANTITY_OF_PAGES = 'SET_QUANTITY_OF_PAGES'

export interface ITableState extends IBaseState {
  tables: ITable[]
  loadingTables: boolean
  tableData?: TEntry[]
  errorTableData?: string
  loadingTableData: boolean
  error?: boolean
  itemsByPage: number
  page: number
  pagination: []
}

export const initialState: ITableState = {
  tables: [],
  loadingTables: false,
  loadingTableData: false,
  error: false,
  itemsByPage: 10,
  page: 0,
  pagination: [],
};

export function tableReducer(state: ITableState, action: IAction) {
  let tables = state.tables || [];
  switch (action.type) {
    case SET_QUANTITY_OF_PAGES:
      return {
        ...state,
        pagination: action.payload
      }
    case SET_QUANTITY_ITEMS_BY_PAGE:
      return {
        ...state,
        itemsByPage: action.payload
      };
    case FETCH_TABLE_ENTRIES_PENDING:
      return {
        ...state,
        tableData: undefined,
        loadingTableData: true,
        errorTableData: undefined
      }
    case FETCH_TABLE_ENTRIES_FULFILLED:
      return {
        ...state,
        loadingTableData: false,
        tableData: action.payload,
        errorTableData: undefined
      }
    case FETCH_TABLE_ENTRIES_REJECTED:
      return {
        ...state,
        loadingTableData: false,
        tableData: [],
        errorTableData: action.payload,
      }
    case FETCH_TABLES_PENDING:
      return {
        ...state,
        loadingTables: true,
      }
    
    case FETCH_TABLE_PENDING:
      tables = tables.map((table: ITable) => ({
        ...table,
        loading: table.name === action.payload
          ? true
          : table.loading,
      }))
      return {
        ...state,
        tables,
      }

    case FETCH_TABLES_FULFILLED:
      (action.payload || []).forEach((table: ITable) => {
        if (!tables.find((t: ITable) => t.name === table.name)) {
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

    case FETCH_TABLE_FULFILLED:
      if (tables.length === 0) {
        tables = [action.payload]
      }
      tables = tables.map((table: ITable) => {
        return table.name === action.payload.name
          ? { ...table, loading: false, ...action.payload }
          : { ...table, loading: false }
      })
      return {
        ...state,
        loadingTables: false,
        tables,
      }

    case FETCH_TABLE_REJECTED:
    case FETCH_TABLES_REJECTED:
      return {
        ...state,
        loadingTables: false,
        error: true,
      }

    default:
      return state
  }
}