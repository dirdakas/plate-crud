import { Action } from '@ngrx/store';

import { getPlateListSuccess, initiatePlateList } from '../actions';
import {
  initialPlateListState,
  plateListReducer,
  PlateListState,
} from './plate-list.reducer';

describe('plateListReducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action: Action = {} as Action;
      const result: PlateListState = plateListReducer(
        initialPlateListState,
        action
      );

      expect(result).toBe(initialPlateListState);
    });
  });

  describe('initiatePlateList', () => {
    it('should set loading to true', () => {
      const action: Action = initiatePlateList();
      const result: PlateListState = plateListReducer(
        initialPlateListState,
        action
      );

      expect(result).toEqual({
        ...initialPlateListState,
        isLoading: true,
      });
    });
  });

  describe('getPlateListSuccess', () => {
    it('should set loading to false and set data', () => {
      const action: Action = getPlateListSuccess({ payload: [] });
      const result: PlateListState = plateListReducer(
        initialPlateListState,
        action
      );

      expect(result).toEqual({
        ...initialPlateListState,
        isLoading: false,
        isLoaded: true,
        data: [],
      });
    });
  });
});
