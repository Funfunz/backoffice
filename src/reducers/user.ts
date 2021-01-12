import { IAction, IBaseState } from "recost"
import { IUser } from "services/api/models/user"

export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED'
export const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED'
export const FETCH_USER_PENDING = 'FETCH_USER_PENDING'

export const LOGIN_FULFILLED = 'LOGIN_FULFILLED'
export const LOGIN_REJECTED = 'LOGIN_REJECTED'
export const LOGIN_PENDING = 'LOGIN_PENDING'

export const REQUEST_RESET_PASSWORD_PENDING = 'REQUEST_RESET_PASSWORD_PENDING'
export const REQUEST_RESET_PASSWORD_FULFILLED = 'REQUEST_RESET_PASSWORD_FULFILLED'
export const REQUEST_RESET_PASSWORD_REJECTED = 'REQUEST_RESET_PASSWORD_REJECTED'

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