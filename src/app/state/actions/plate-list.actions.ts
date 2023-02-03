import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { ITableItem } from 'src/app/models';

export enum PlateListTypes {
  InitiatePlateList = '[Plate-List] Get plate list',
  GetPlateListSuccess = '[Plate-List] Get plate list success',
  DeletePlate = '[Plate-List] Delete plate',
  DeletePlateSuccess = '[Plate-List] Delete plate success',
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
  (props: ITableItem) => TypedAction<PlateListTypes.DeletePlateSuccess>
> = createAction(PlateListTypes.DeletePlateSuccess, props<ITableItem>());
