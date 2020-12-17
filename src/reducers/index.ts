import recost from 'recost'
import logger from 'recost-logger'

import { userReducer, initialState as userInitialState, IUserState } from './user'
import { tableReducer, initialState as tableInitialState, ITableState } from './table'
import { entryReducer, initialState as entryInitialState, IEntryState } from './entry'
import { entitiesCountReducer, initialState as entitiesCountInitialState, IEntitiesCountState } from './entitiesCount'
import { filterReducer, initialState as filterInitialState, IFilterState } from './filters'

interface IState extends IUserState, ITableState, IEntryState, IFilterState, IEntitiesCountState {}

const initialState: IState = {
  ...userInitialState,
  ...tableInitialState,
  ...entryInitialState,
  ...entitiesCountInitialState,
  ...filterInitialState,
}

const reducers = [
  userReducer,
  tableReducer,
  entryReducer,
  entitiesCountReducer,
  filterReducer,
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