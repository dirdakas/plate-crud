import { Action } from '@ngrx/store';

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
  PlateListTypes,
  updatePlate,
  updatePlateFailed,
  updatePlateSuccess,
} from './plate-list.actions';

describe('Store - plate list actions', () => {
  const mockedPlateItem: IPlateDetails = {
    lastName: 'lastName',
    name: 'name',
    plate: 'plate',
    id: 0,
  };

  it('initiatePlateList', () => {
    const action: Action = initiatePlateList();
    expect({ ...action }).toEqual({
      type: PlateListTypes.InitiatePlateList,
    });
  });

  it('getPlateListSuccess', () => {
    const action: Action = getPlateListSuccess({ payload: [] });
    expect({ ...action }).toEqual({
      type: PlateListTypes.GetPlateListSuccess,
      payload: [],
    } as unknown as Action);
  });

  it('deletePlate', () => {
    const action: Action = deletePlate({ payload: mockedPlateItem });
    expect({ ...action }).toEqual({
      type: PlateListTypes.DeletePlate,
      payload: mockedPlateItem,
    } as unknown as Action);
  });

  it('deletePlateSuccess', () => {
    const action: Action = deletePlateSuccess({ payload: [mockedPlateItem] });
    expect({ ...action }).toEqual({
      type: PlateListTypes.DeletePlateSuccess,
      payload: [mockedPlateItem],
    } as unknown as Action);
  });

  it('createPlate', () => {
    const action: Action = createPlate({ payload: mockedPlateItem });
    expect({ ...action }).toEqual({
      type: PlateListTypes.CreatePlate,
      payload: mockedPlateItem,
    } as unknown as Action);
  });

  it('createPlateSuccess', () => {
    const action: Action = createPlateSuccess({ payload: [mockedPlateItem] });
    expect({ ...action }).toEqual({
      type: PlateListTypes.CreatePlateSuccess,
      payload: [mockedPlateItem],
    } as unknown as Action);
  });

  it('updatePlate', () => {
    const action: Action = updatePlate({ payload: mockedPlateItem });
    expect({ ...action }).toEqual({
      type: PlateListTypes.UpdatePlate,
      payload: mockedPlateItem,
    } as unknown as Action);
  });

  it('updatePlateSuccess', () => {
    const action: Action = updatePlateSuccess({ payload: [mockedPlateItem] });
    expect({ ...action }).toEqual({
      type: PlateListTypes.UpdatePlateSuccess,
      payload: [mockedPlateItem],
    } as unknown as Action);
  });

  it('initiatePlateListFailed', () => {
    const action: Action = initiatePlateListFailed();
    expect({ ...action }).toEqual({
      type: PlateListTypes.GetPlateListFailed,
    } as unknown as Action);
  });

  it('deletePlateFailed', () => {
    const action: Action = deletePlateFailed();
    expect({ ...action }).toEqual({
      type: PlateListTypes.DeletePlateFailed,
    } as unknown as Action);
  });

  it('createPlateFailed', () => {
    const action: Action = createPlateFailed();
    expect({ ...action }).toEqual({
      type: PlateListTypes.CreatePlateFailed,
    } as unknown as Action);
  });

  it('updatePlateFailed', () => {
    const action: Action = updatePlateFailed();
    expect({ ...action }).toEqual({
      type: PlateListTypes.UpdatePlateFailed,
    } as unknown as Action);
  });
});
