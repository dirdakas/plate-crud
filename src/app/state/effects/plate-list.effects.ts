import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, map } from 'rxjs';

import { getPlateListSuccess, initiatePlateList } from '../actions';
import dataFile from 'src/assets/data.json';
import { IPlateDetails } from 'src/app/models/plate-details.model';

@Injectable()
export class PlateListEffects {
  constructor(
    private actions$: Actions
  ) {}

  initiatePlateList$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(initiatePlateList),
      map(() => getPlateListSuccess({ payload: dataFile.dataList?.map((item: IPlateDetails, index: number) => ({...item, index})) || [] }))
    )
  );
}
