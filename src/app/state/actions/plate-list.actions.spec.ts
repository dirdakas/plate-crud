import { Action } from '@ngrx/store';

import { ITableItem } from 'src/app/models';
import {
  createPlate,
  createPlateSuccess,
  deletePlate,
  deletePlateSuccess,
  getPlateListSuccess,
  initiatePlateList,
  PlateListTypes,
  updatePlate,
  updatePlateSuccess,
} from './plate-list.actions';

describe('Store - plate list actions', () => {
  const mockedPlateItem: ITableItem = {
    lastName: 'lastName',
    name: 'name',
    plate: 'plate',
    index: 0,
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
    const action: Action = deletePlate(mockedPlateItem);
    expect({ ...action }).toEqual({
      type: PlateListTypes.DeletePlate,
      ...mockedPlateItem,
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
});
