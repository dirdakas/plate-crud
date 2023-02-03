import { Action } from '@ngrx/store';

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
import {
  initialPlateListState,
  plateListReducer,
  PlateListState,
} from './plate-list.reducer';

describe('plateListReducer', () => {
  const mockedPlateItem: ITableItem = {
    lastName: 'lastName',
    name: 'name',
    plate: 'plate',
    index: 0,
  };

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

  describe('createPlate', () => {
    it('should set loading to true', () => {
      const action: Action = createPlate({ payload: {} } as {
        payload: ITableItem;
      });
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

  describe('updatePlate', () => {
    it('should set loading to true', () => {
      const action: Action = updatePlate({ payload: {} } as {
        payload: ITableItem;
      });
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

  describe('deletePlate', () => {
    it('should set loading to true', () => {
      const action: Action = deletePlate(mockedPlateItem);
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

  describe('deletePlateSuccess', () => {
    it('should set loading to false and update data list', () => {
      const action: Action = deletePlateSuccess({ payload: [mockedPlateItem] });
      const result: PlateListState = plateListReducer(
        {
          ...initialPlateListState,
          data: [mockedPlateItem],
        },
        action
      );

      expect(result).toEqual({
        ...initialPlateListState,
        isLoading: false,
        data: [mockedPlateItem],
      });
    });
  });

  describe('createPlateSuccess', () => {
    it('should set loading to false and update data list', () => {
      const action: Action = createPlateSuccess({ payload: [mockedPlateItem] });
      const result: PlateListState = plateListReducer(
        {
          ...initialPlateListState,
          data: [
            { ...mockedPlateItem },
            { ...mockedPlateItem, plate: 'plate2' },
          ],
        },
        action
      );

      expect(result).toEqual({
        ...initialPlateListState,
        isLoading: false,
        data: [{ ...mockedPlateItem }],
      });
    });
  });

  describe('updatePlateSuccess', () => {
    it('should set loading to false and update data list', () => {
      const action: Action = updatePlateSuccess({ payload: [mockedPlateItem] });
      const result: PlateListState = plateListReducer(
        {
          ...initialPlateListState,
          data: [
            { ...mockedPlateItem },
            { ...mockedPlateItem, plate: 'plate2' },
          ],
        },
        action
      );

      expect(result).toEqual({
        ...initialPlateListState,
        isLoading: false,
        data: [{ ...mockedPlateItem }],
      });
    });
  });
});
