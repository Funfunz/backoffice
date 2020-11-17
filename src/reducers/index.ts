import recost from 'recost'
import logger from 'recost-logger'

import {userReducer, initialState as userInitialState, IUserState } from './user'
import { tableReducer, initialState as tableInitialState, ITableState } from './table'
import { entryReducer, initialState as entryInitialState, IEntryState } from './entry'

interface IState extends IUserState, ITableState, IEntryState {}

const initialState: IState = {
  ...userInitialState,
  ...tableInitialState,
  ...entryInitialState
}

const reducers = [
  userReducer,
  tableReducer,
  entryReducer,
]

const middlewares = [
  logger,
]

export const { 
  Provider,
  dispatch,
  withState,
  useSelector,
} = recost<IState>(initialState, reducers, middlewares)