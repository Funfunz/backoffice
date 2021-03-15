import recost from 'recost'
import logger from 'recost-logger'

import { userReducer, initialState as userInitialState, IUserState } from './user'

interface IState extends IUserState {}

const initialState: IState = {
  ...userInitialState,
}

const reducers = [
  userReducer,
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