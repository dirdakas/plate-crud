import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { IPlateDetails } from 'src/app/models';

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
    payload: IPlateDetails[];
  }) => TypedAction<PlateListTypes.GetPlateListSuccess>
> = createAction(
  PlateListTypes.GetPlateListSuccess,
  props<{ payload: IPlateDetails[] }>()
);

export const deletePlate: ActionCreator<
  PlateListTypes.DeletePlate,
  (props: IPlateDetails) => TypedAction<PlateListTypes.DeletePlate>
> = createAction(PlateListTypes.DeletePlate, props<IPlateDetails>());

export const deletePlateSuccess: ActionCreator<
  PlateListTypes.DeletePlateSuccess,
  (props: {
    payload: IPlateDetails[];
  }) => TypedAction<PlateListTypes.DeletePlateSuccess>
> = createAction(
  PlateListTypes.DeletePlateSuccess,
  props<{
    payload: IPlateDetails[];
  }>()
);

export const createPlate: ActionCreator<
  PlateListTypes.CreatePlate,
  (props: { payload: IPlateDetails }) => TypedAction<PlateListTypes.CreatePlate>
> = createAction(
  PlateListTypes.CreatePlate,
  props<{ payload: IPlateDetails }>()
);

export const createPlateSuccess: ActionCreator<
  PlateListTypes.CreatePlateSuccess,
  (props: {
    payload: IPlateDetails[];
  }) => TypedAction<PlateListTypes.CreatePlateSuccess>
> = createAction(
  PlateListTypes.CreatePlateSuccess,
  props<{ payload: IPlateDetails[] }>()
);

export const updatePlate: ActionCreator<
  PlateListTypes.UpdatePlate,
  (props: { payload: IPlateDetails }) => TypedAction<PlateListTypes.UpdatePlate>
> = createAction(
  PlateListTypes.UpdatePlate,
  props<{ payload: IPlateDetails }>()
);

export const updatePlateSuccess: ActionCreator<
  PlateListTypes.UpdatePlateSuccess,
  (props: {
    payload: IPlateDetails[];
  }) => TypedAction<PlateListTypes.UpdatePlateSuccess>
> = createAction(
  PlateListTypes.UpdatePlateSuccess,
  props<{ payload: IPlateDetails[] }>()
);
