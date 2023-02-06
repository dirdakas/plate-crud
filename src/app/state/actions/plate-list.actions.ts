import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { IPlateDetails } from 'src/app/models';

export enum PlateListTypes {
  InitiatePlateList = '[Plate-List] Get plate list',
  GetPlateListSuccess = '[Plate-List] Get plate list success',
  GetPlateListFailed = '[Plate-List] Get plate list failed',
  DeletePlate = '[Plate-List] Delete plate',
  DeletePlateSuccess = '[Plate-List] Delete plate success',
  DeletePlateFailed = '[Plate-List] Delete plate failed',
  CreatePlate = '[Plate-List] Create plate',
  CreatePlateSuccess = '[Plate-List] Create plate success',
  CreatePlateFailed = '[Plate-List] Create plate failed',
  UpdatePlate = '[Plate-List] Update plate',
  UpdatePlateSuccess = '[Plate-List] Update plate success',
  UpdatePlateFailed = '[Plate-List] Update plate failed',
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
  (props: { payload: IPlateDetails }) => TypedAction<PlateListTypes.DeletePlate>
> = createAction(
  PlateListTypes.DeletePlate,
  props<{ payload: IPlateDetails }>()
);

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

export const initiatePlateListFailed: ActionCreator<
  PlateListTypes.GetPlateListFailed,
  () => TypedAction<PlateListTypes.GetPlateListFailed>
> = createAction(PlateListTypes.GetPlateListFailed);

export const deletePlateFailed: ActionCreator<
  PlateListTypes.DeletePlateFailed,
  () => TypedAction<PlateListTypes.DeletePlateFailed>
> = createAction(PlateListTypes.DeletePlateFailed);

export const createPlateFailed: ActionCreator<
  PlateListTypes.CreatePlateFailed,
  () => TypedAction<PlateListTypes.CreatePlateFailed>
> = createAction(PlateListTypes.CreatePlateFailed);

export const updatePlateFailed: ActionCreator<
  PlateListTypes.UpdatePlateFailed,
  () => TypedAction<PlateListTypes.UpdatePlateFailed>
> = createAction(PlateListTypes.UpdatePlateFailed);
