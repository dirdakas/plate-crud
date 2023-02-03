import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { ITableItem } from 'src/app/models';

export enum PlateListTypes {
  InitiatePlateList = '[Plate-List] Get plate list',
  GetPlateListSuccess = '[Plate-List] Get plate list success',
  DeletePlate = '[Plate-List] Delete plate',
  DeletePlateSuccess = '[Plate-List] Delete plate success',
  CreatePlate = '[Plate-List] Create plate',
  CreatePlateSuccess = '[Plate-List] Create plate success',
  UpdatePlate = '[Plate-List] Update plate',
  UpdatePlateSuccess = '[Plate-List] Update plate success',
}

export const initiatePlateList: ActionCreator<
  PlateListTypes.InitiatePlateList,
  () => TypedAction<PlateListTypes.InitiatePlateList>
> = createAction(PlateListTypes.InitiatePlateList);

export const getPlateListSuccess: ActionCreator<
  PlateListTypes.GetPlateListSuccess,
  (props: {
    payload: ITableItem[];
  }) => TypedAction<PlateListTypes.GetPlateListSuccess>
> = createAction(
  PlateListTypes.GetPlateListSuccess,
  props<{ payload: ITableItem[] }>()
);

export const deletePlate: ActionCreator<
  PlateListTypes.DeletePlate,
  (props: ITableItem) => TypedAction<PlateListTypes.DeletePlate>
> = createAction(PlateListTypes.DeletePlate, props<ITableItem>());

export const deletePlateSuccess: ActionCreator<
  PlateListTypes.DeletePlateSuccess,
  (props: {
    payload: ITableItem[];
  }) => TypedAction<PlateListTypes.DeletePlateSuccess>
> = createAction(
  PlateListTypes.DeletePlateSuccess,
  props<{
    payload: ITableItem[];
  }>()
);

export const createPlate: ActionCreator<
  PlateListTypes.CreatePlate,
  (props: { payload: ITableItem }) => TypedAction<PlateListTypes.CreatePlate>
> = createAction(PlateListTypes.CreatePlate, props<{ payload: ITableItem }>());

export const createPlateSuccess: ActionCreator<
  PlateListTypes.CreatePlateSuccess,
  (props: {
    payload: ITableItem[];
  }) => TypedAction<PlateListTypes.CreatePlateSuccess>
> = createAction(
  PlateListTypes.CreatePlateSuccess,
  props<{ payload: ITableItem[] }>()
);

export const updatePlate: ActionCreator<
  PlateListTypes.UpdatePlate,
  (props: { payload: ITableItem }) => TypedAction<PlateListTypes.UpdatePlate>
> = createAction(PlateListTypes.UpdatePlate, props<{ payload: ITableItem }>());

export const updatePlateSuccess: ActionCreator<
  PlateListTypes.UpdatePlateSuccess,
  (props: {
    payload: ITableItem[];
  }) => TypedAction<PlateListTypes.UpdatePlateSuccess>
> = createAction(
  PlateListTypes.UpdatePlateSuccess,
  props<{ payload: ITableItem[] }>()
);
