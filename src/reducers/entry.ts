import { IAction, IBaseState } from "recost"

export const FETCH_ENTRY_PENDING = 'FETCH_ENTRY_PENDING'
export const FETCH_ENTRY_FULFILLED = 'FETCH_ENTRY_FULFILLED'
export const FETCH_ENTRY_REJECTED = 'FETCH_ENTRY_REJECTED'
export const CLEAR_ERROR_ENTRY = 'CLEAR_ERROR_ENTRY'

export type TEntry = Record<string, string | number>

export interface IEntryState extends IBaseState {
  entry?: TEntry
  loadingEntry: boolean
  errorEntry?: string
}

export const initialState: IEntryState = {
  entry: undefined,
  loadingEntry: false,
  errorEntry: undefined,
}

export function entryReducer(state: IEntryState, action: IAction) {
  switch(action.type) {
    case FETCH_ENTRY_PENDING:
      return {
        ...state,
        entry: undefined,
        loadingEntry: true,
        errorEntry: undefined
      }
    case FETCH_ENTRY_FULFILLED:
      return {
        ...state,
        loadingEntry: false,
        entry: action.payload,
        errorEntry: undefined
      }
    case FETCH_ENTRY_REJECTED:
      return {
        ...state,
        loadingEntry: false,
        entry: undefined,
        errorEntry: action.payload,
      }
    case CLEAR_ERROR_ENTRY:
      return {
        ...state,
        errorEntry: undefined,
      }
    default:
      return state
  }
}