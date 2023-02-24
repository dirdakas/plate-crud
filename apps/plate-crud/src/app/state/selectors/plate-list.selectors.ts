import { createSelector, MemoizedSelector } from '@ngrx/store';

import { PlateListState, selectPlateListState } from '../reducers';
import { IPlateDetails } from '../../models';

export const getPlateListState: MemoizedSelector<
  object,
  PlateListState | undefined
> = createSelector(selectPlateListState, state => (state ? state : undefined));

export const isLoading: MemoizedSelector<PlateListState, boolean> =
  createSelector(getPlateListState, state => !!state?.isLoading);

export const isLoaded: MemoizedSelector<PlateListState, boolean> =
  createSelector(getPlateListState, state => !!state?.isLoaded);

export const getPlateList: MemoizedSelector<PlateListState, IPlateDetails[]> =
  createSelector(getPlateListState, state => state?.data || []);
