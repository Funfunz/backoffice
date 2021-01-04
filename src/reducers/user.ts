import { IAction, IBaseState } from "recost"
import { IUser } from "services/api/models/user"

export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED'

export interface IUserState extends IBaseState {
  user?: IUser;
};

export const initialState: IUserState = {
  user: undefined,
}

export function userReducer(state: IUserState, action: IAction) {
  switch(action.type) {
    case FETCH_USER_FULFILLED:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}