import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { ITableItem } from 'src/app/models/table-item.model';

export enum PlateListTypes {
  InitiatePlateList = '[Plate-List] Get plate list',
  GetPlateListSuccess = '[Plate-List] Get plate list success',
}

export const initiatePlateList: ActionCreator<
  PlateListTypes.InitiatePlateList, () => TypedAction<PlateListTypes.InitiatePlateList>
> = createAction(PlateListTypes.InitiatePlateList);

export const getPlateListSuccess: ActionCreator<
  PlateListTypes.GetPlateListSuccess, (props: {
    payload: ITableItem []
  }) => TypedAction<PlateListTypes.GetPlateListSuccess>
> = createAction(
  PlateListTypes.GetPlateListSuccess,
  props<{ payload: ITableItem[] }>()
);
