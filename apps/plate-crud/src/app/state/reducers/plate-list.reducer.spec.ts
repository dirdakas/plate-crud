import { Action } from '@ngrx/store';
import { IPlateDetails } from '../../models';

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
import {
  initialPlateListState,
  plateListReducer,
  PlateListState,
} from './plate-list.reducer';

describe('plateListReducer', () => {
  const mockedPlateItem: IPlateDetails = {
    lastName: 'lastName',
    name: 'name',
    plate: 'plate',
    id: 0,
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
        payload: IPlateDetails;
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
        payload: IPlateDetails;
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
      const action: Action = deletePlate({ payload: mockedPlateItem });
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

  describe('initiatePlateListFailed', () => {
    it('should set loading to false', () => {
      const action: Action = initiatePlateListFailed();
      const result: PlateListState = plateListReducer(
        {
          ...initialPlateListState,
          isLoading: true,
        },
        action
      );

      expect(result).toEqual({
        ...initialPlateListState,
        isLoading: false,
      });
    });
  });

  describe('createPlateFailed', () => {
    it('should set loading to false', () => {
      const action: Action = createPlateFailed();
      const result: PlateListState = plateListReducer(
        {
          ...initialPlateListState,
          isLoading: true,
        },
        action
      );

      expect(result).toEqual({
        ...initialPlateListState,
        isLoading: false,
      });
    });
  });

  describe('updatePlateFailed', () => {
    it('should set loading to false', () => {
      const action: Action = updatePlateFailed();
      const result: PlateListState = plateListReducer(
        {
          ...initialPlateListState,
          isLoading: true,
        },
        action
      );

      expect(result).toEqual({
        ...initialPlateListState,
        isLoading: false,
      });
    });
  });

  describe('deletePlateFailed', () => {
    it('should set loading to false', () => {
      const action: Action = deletePlateFailed();
      const result: PlateListState = plateListReducer(
        {
          ...initialPlateListState,
          isLoading: true,
        },
        action
      );

      expect(result).toEqual({
        ...initialPlateListState,
        isLoading: false,
      });
    });
  });
});
