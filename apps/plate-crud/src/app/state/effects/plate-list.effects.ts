import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import {
  Observable,
  map,
  withLatestFrom,
  switchMap,
  catchError,
  of,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
import { PlateListState } from '../reducers';
import { getPlateList } from '../selectors';
import { PlateService } from '../../services';
import { IPlateDetails } from '../../models';

@Injectable()
export class PlateListEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<PlateListState>,
    private plateService: PlateService,
    private _snackBar: MatSnackBar
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
      ),
      catchError(err => {
        this._snackBar.open(err.error, '', {
          duration: 2000,
        });
        return of(initiatePlateListFailed());
      })
    )
  );

  deletePlate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePlate),
      switchMap((action: any) => this.plateService.deletePlate(action.payload)),
      withLatestFrom(this.store$.select(getPlateList)),
      map(([item, list]) => {
        return deletePlateSuccess({
          payload: this.removeItemFromList(
            item as unknown as IPlateDetails,
            list
          ),
        });
      }),
      catchError(err => {
        this._snackBar.open(err.error, '', {
          duration: 2000,
        });
        return of(deletePlateFailed());
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
      }),
      catchError(err => {
        this._snackBar.open(err.error, '', {
          duration: 2000,
        });
        return of(createPlateFailed());
      })
    )
  );

  updatePlate$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePlate),
      switchMap((action: any) => this.plateService.updatePlate(action.payload)),
      withLatestFrom(this.store$.select(getPlateList)),
      map(([item, list]) => {
        return updatePlateSuccess({
          payload: this.getUpdatedList(false, item as IPlateDetails, list),
        });
      }),
      catchError(err => {
        this._snackBar.open(err.error, '', {
          duration: 2000,
        });
        return of(updatePlateFailed());
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
