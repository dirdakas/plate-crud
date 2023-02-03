import { Action } from '@ngrx/store';

import { ITableItem } from 'src/app/models';
import {
  deletePlate,
  deletePlateSuccess,
  getPlateListSuccess,
  initiatePlateList,
  PlateListTypes,
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
    const action: Action = deletePlateSuccess(mockedPlateItem);
    expect({ ...action }).toEqual({
      type: PlateListTypes.DeletePlateSuccess,
      ...mockedPlateItem,
    } as unknown as Action);
  });
});
