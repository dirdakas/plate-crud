import {
  Action,
  ActionReducer,
  createFeatureSelector,
  createReducer,
  MemoizedSelector,
  on,
} from '@ngrx/store';

import { ITableItem } from 'src/app/models';
import {
  createPlate,
  createPlateSuccess,
  deletePlate,
  deletePlateSuccess,
  getPlateListSuccess,
  initiatePlateList,
  updatePlate,
  updatePlateSuccess,
} from '../actions';

export interface PlateListState {
  isLoading: boolean;
  isLoaded: boolean;
  data?: ITableItem[];
}

export const plateListFeatureKey = 'plate-list';

export const initialPlateListState: PlateListState = {
  isLoading: false,
  isLoaded: false,
};

const reducer: ActionReducer<PlateListState, Action> = createReducer(
  initialPlateListState,
  on(initiatePlateList, deletePlate, createPlate, updatePlate, state => ({
    ...state,
    isLoading: true,
  })),
  on(getPlateListSuccess, (state, action: any) => {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      data: [...action.payload],
    };
  }),
  on(deletePlateSuccess, (state, action: any) => {
    return {
      ...state,
      isLoading: false,
      data: state.data?.filter(item => item.plate !== action.plate), // @TODO: move out to effect
    };
  }),
  on(createPlateSuccess, updatePlateSuccess, (state, action: any) => ({
    ...state,
    isLoading: false,
    data: action.payload,
  }))
);

export function plateListReducer(
  state: PlateListState | undefined,
  action: Action
): PlateListState {
  return reducer(state, action);
}

export const selectPlateListState: MemoizedSelector<object, PlateListState> =
  createFeatureSelector<PlateListState>(plateListFeatureKey);
