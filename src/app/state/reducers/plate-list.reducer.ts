import {
  Action,
  ActionReducer,
  createFeatureSelector,
  createReducer,
  MemoizedSelector,
  on,
} from '@ngrx/store';

import { ITableItem } from 'src/app/models/table-item.model';
import {
  getPlateListSuccess,
  initiatePlateList,
} from '../actions/plate-list.actions';

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
  on(initiatePlateList, state => ({
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
  })
);

export function plateListReducer(
  state: PlateListState | undefined,
  action: Action
): PlateListState {
  return reducer(state, action);
}

export const selectPlateListState: MemoizedSelector<object, PlateListState> =
  createFeatureSelector<PlateListState>(plateListFeatureKey);
