import { IAction, IBaseState } from "recost"

export const UPDATE_SELECTED_FILTER = 'UPDATE_SELECTED_FILTER'
export const CLEAR_SELECTED_FILTER = 'CLEAR_SELECTED_FILTER'

export interface IFilterState extends IBaseState {
  selectedFilters: {
    [key: string]: unknown
  }
}

export const initialState: IFilterState = {
  selectedFilters: {}
}

export function filterReducer(state: IFilterState, action: IAction) {
  switch(action.type) {
    case UPDATE_SELECTED_FILTER:
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          [action.payload.propertyName]: action.payload.value
        }
      }
    case CLEAR_SELECTED_FILTER:
      return {
        ...state,
        selectedFilters: {}
      }

    default:
      return state
  }
}