import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { Observable, map, withLatestFrom, switchMap } from 'rxjs';

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
import { IPlateDetails } from 'src/app/models';
import { PlateListState } from '../reducers';
import { getPlateList } from '../selectors';
import { PlateService } from 'src/app/services';

@Injectable()
export class PlateListEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<PlateListState>,
    private plateService: PlateService
  ) {}

  initiatePlateList$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(initiatePlateList),
      switchMap(() => this.plateService.getPlates()),
      map((plates: IPlateDetails[]) =>
        getPlateListSuccess({
          payload:
            plates?.map((item: IPlateDetails, index: number) => ({
              ...item,
              index,
            })) || [],
        })
      )
    )
  );

  deletePlate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePlate),
      withLatestFrom(this.store$.select(getPlateList)),
      map(([item, list]) => {
        return deletePlateSuccess({
          payload: this.removeItemFromList(
            item as unknown as IPlateDetails,
            list
          ),
        });
      })
    )
  );

  createPlate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(createPlate),
      switchMap((action: any) => this.plateService.createPlate(action.payload)),
      withLatestFrom(this.store$.select(getPlateList)),
      map(([item, list]) => {
        return createPlateSuccess({
          payload: this.getUpdatedList(true, item as IPlateDetails, list),
        });
      })
    )
  );

  updatePlate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePlate),
      switchMap((action: any) => this.plateService.updatePlate(action.payload)),
      withLatestFrom(this.store$.select(getPlateList)),
      map(([item, list]) => {
        // @TODO: update file
        return updatePlateSuccess({
          payload: this.getUpdatedList(false, item as IPlateDetails, list),
        });
      })
    )
  );

  private removeItemFromList(
    item: IPlateDetails,
    curList: IPlateDetails[]
  ): IPlateDetails[] {
    return curList.length ? curList.filter(el => el.id !== item.id) : [];
  }

  private getUpdatedList(
    isAdd: boolean,
    item: IPlateDetails,
    curList: IPlateDetails[]
  ): IPlateDetails[] {
    return curList.length
      ? isAdd
        ? [...curList, item]
        : curList.map(el => (el.id === item.id ? item : el))
      : [
          {
            plate: item.plate,
            name: item.name,
            lastName: item.lastName,
            id: item.id,
          },
        ];
  }
}
