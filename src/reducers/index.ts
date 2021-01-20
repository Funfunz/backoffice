import recost from 'recost'
import logger from 'recost-logger'

import { userReducer, initialState as userInitialState, IUserState } from './user'
import { entityReducer, initialState as tableInitialState, IEntityState } from './entity'
import { entryReducer, initialState as entryInitialState, IEntryState } from './entry'
import { filterReducer, initialState as filterInitialState, IFilterState } from './filters'
import { entitiesCountReducer, initialState as entitiesCountInitialState, IEntitiesCountState } from './entitiesCount'


interface IState extends IUserState, IEntityState, IEntryState, IFilterState, IEntitiesCountState  {}


const initialState: IState = {
  ...userInitialState,
  ...tableInitialState,
  ...entryInitialState,
  ...filterInitialState,
  ...entitiesCountInitialState,
}

const reducers = [
  userReducer,
  entityReducer,
  entryReducer,
  filterReducer,
  entitiesCountReducer,
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