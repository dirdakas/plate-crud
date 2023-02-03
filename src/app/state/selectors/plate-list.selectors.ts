import { createSelector, MemoizedSelector } from '@ngrx/store';

import { ITableItem } from 'src/app/models';
import { PlateListState, selectPlateListState } from '../reducers';

export const getPlateListState: MemoizedSelector<
  object,
  PlateListState | undefined
> = createSelector(selectPlateListState, state => (state ? state : undefined));

export const isLoading: MemoizedSelector<PlateListState, boolean> =
  createSelector(getPlateListState, state => !!state?.isLoading);

export const isLoaded: MemoizedSelector<PlateListState, boolean> =
  createSelector(getPlateListState, state => !!state?.isLoaded);

export const getPlateList: MemoizedSelector<PlateListState, ITableItem[]> =
  createSelector(getPlateListState, state => state?.data || []);

export const getNewPlateIndex: MemoizedSelector<PlateListState, number> =
  createSelector(
    getPlateListState,
    state =>
      (!!state?.data &&
        state.data.length &&
        state.data[state.data.length - 1].index + 1) ||
      0
  );
