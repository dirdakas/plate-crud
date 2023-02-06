import {
  Action,
  ActionReducer,
  createFeatureSelector,
  createReducer,
  MemoizedSelector,
  on,
} from '@ngrx/store';

import { IPlateDetails } from 'src/app/models';
import {
  createPlate,
  createPlateFailed,
  createPlateSuccess,
  deletePlate,
  deletePlateFailed,
  deletePlateSuccess,
  getPlateListSuccess,
  initiatePlateList,
  initiatePlateListFailed,
  updatePlate,
  updatePlateFailed,
  updatePlateSuccess,
} from '../actions';

export interface PlateListState {
  isLoading: boolean;
  isLoaded: boolean;
  data?: IPlateDetails[];
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
  on(
    createPlateSuccess,
    updatePlateSuccess,
    deletePlateSuccess,
    (state, action: any) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    })
  ),
  on(
    initiatePlateListFailed,
    createPlateFailed,
    updatePlateFailed,
    deletePlateFailed,
    state => ({
      ...state,
      isLoading: false,
    })
  )
);

export function plateListReducer(
  state: PlateListState | undefined,
  action: Action
): PlateListState {
  return reducer(state, action);
}

export const selectPlateListState: MemoizedSelector<object, PlateListState> =
  createFeatureSelector<PlateListState>(plateListFeatureKey);
