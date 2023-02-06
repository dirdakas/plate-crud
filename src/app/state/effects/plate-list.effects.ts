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
import { IPlateDetails, ITableItem } from 'src/app/models';
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
        // @TODO: add removal from file
        return deletePlateSuccess({
          payload: this.removeItemFromList(item as unknown as ITableItem, list),
        });
      })
    )
  );

  createPlate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(createPlate),
      withLatestFrom(this.store$.select(getPlateList)),
      map(([item, list]) => {
        // @TODO: add to file
        return createPlateSuccess({
          payload: this.getUpdatedList(true, (item as any).payload, list),
        });
      })
    )
  );

  updatePlate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePlate),
      withLatestFrom(this.store$.select(getPlateList)),
      map(([item, list]) => {
        // @TODO: update file
        return updatePlateSuccess({
          payload: this.getUpdatedList(false, (item as any).payload, list),
        });
      })
    )
  );

  private removeItemFromList(
    item: ITableItem,
    curList: ITableItem[]
  ): ITableItem[] {
    return curList.length ? curList.filter(el => el.plate !== item.plate) : [];
  }

  private getUpdatedList(
    isAdd: boolean,
    item: ITableItem,
    curList: ITableItem[]
  ): ITableItem[] {
    return curList.length
      ? isAdd
        ? [...curList, item]
        : curList.map(el => (el.index === item.index ? item : el))
      : [
          {
            plate: item.plate,
            name: item.name,
            lastName: item.lastName,
            index: item.index,
          },
        ];
  }
}
