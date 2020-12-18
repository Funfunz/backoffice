import { IAction, IBaseState } from "recost";

export const FETCH_ENTITIES_COUNT = 'FETCH_ENTITIES_COUNT';
export const FETCH_ENTITIES_COUNT_LOADING = 'FETCH_ENTITIES_COUNT_LOADING';

export interface IEntityData {
  entity: string,
  count: number
}

export interface IEntitiesCountState extends IBaseState {
  entitiesCount: IEntityData[],
  loadingEntitiesCount: boolean
};

export const initialState: IEntitiesCountState = {
  entitiesCount: [],
  loadingEntitiesCount: false
};

const fetchEntitiesCount = (state: IEntitiesCountState, action: IAction) => {
  const entities = [...state.entitiesCount];

  action.payload.forEach((newEntity: IEntityData) => {
    let itemFounded = false;
    entities.forEach(entity => {
      if (entity.entity === newEntity.entity) {
        itemFounded = true;
        entity.count = newEntity.count;
      }
    })
    if (!itemFounded) {
      entities.push(newEntity)
    }
  })
  return {
    ...state,
    entitiesCount: entities,
    loadingEntitiesCount: false
  }
}

export function entitiesCountReducer(state: IEntitiesCountState, action: IAction) {
  switch(action.type) {
    case FETCH_ENTITIES_COUNT:
      return fetchEntitiesCount(state, action)
    case FETCH_ENTITIES_COUNT_LOADING:
        return {
          ...state,
          loadingEntitiesCount: action.payload
        }
    default:
      return state
  }
}