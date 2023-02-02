import { Action } from '@ngrx/store';

import { getPlateListSuccess, initiatePlateList, PlateListTypes } from './plate-list.actions';

describe('Store - plate list actions', () => {
  it('initiatePlateList', () => {
    const action: Action = initiatePlateList();
    expect({ ...action }).toEqual({
      type: PlateListTypes.InitiatePlateList
    });
  });

  it('getPlateListSuccess', () => {
    const action: Action = getPlateListSuccess({payload: []});
    expect({ ...action }).toEqual(({
      type: PlateListTypes.GetPlateListSuccess,
      payload: []
    } as unknown) as Action);
  });
});
