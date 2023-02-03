import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { take, tap } from 'rxjs';

import { ConfirmationModalComponent } from 'src/app/components';
import { ITableItem } from 'src/app/models';
import {
  createPlate,
  getNewPlateIndex,
  PlateListState,
  updatePlate,
} from 'src/app/state';
import { PLATE_NUMBER_REGEX } from '../../models';

export interface IEditItem {
  item?: ITableItem;
  currPlates: string[];
}

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss'],
})
export class EditItemModalComponent {
  isCreate = true;
  plateForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: IEditItem,
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    private fb: FormBuilder,
    private store$: Store<PlateListState>
  ) {
    this.plateForm = this.fb.group({
      plate: new FormControl(this.data ? this.data.item?.plate : '', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
        this.uniqPlateValidator(),
        Validators.pattern(PLATE_NUMBER_REGEX),
      ]),
      name: new FormControl(this.data ? this.data.item?.name : '', [
        Validators.required,
        Validators.minLength(2),
        this.onlyLettersValidator(),
      ]),
      lastName: new FormControl(this.data ? this.data.item?.lastName : '', [
        Validators.required,
        Validators.minLength(2),
        this.onlyLettersValidator(),
      ]),
    });

    this.isCreate = !this.data.item;
  }

  createNewPlate(): void {
    if (this.plateForm.valid) {
      this.store$
        .pipe(
          select(getNewPlateIndex),
          take(1),
          tap((index: number) => {
            this.store$.dispatch(
              createPlate({
                payload: {
                  plate: this.plateForm.value.plate.toUpperCase(),
                  index,
                  lastName: this.plateForm.value.lastName,
                  name: this.plateForm.value.name,
                },
              })
            );
            this.dialogRef.close();
          })
        )
        .subscribe();
    } else {
      this.plateForm.markAllAsTouched();
    }
  }

  updatePlate(): void {
    if (this.plateForm.valid) {
      this.store$.dispatch(
        updatePlate({
          payload: {
            plate: this.plateForm.value.plate.toUpperCase(),
            index: (this.data.item as ITableItem).index,
            lastName: this.plateForm.value.lastName,
            name: this.plateForm.value.name,
          },
        })
      );
      this.dialogRef.close();
    } else {
      this.plateForm.markAllAsTouched();
    }
  }

  private uniqPlateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const plate: string = control.value || '';

      if (!!plate && this.data.currPlates.includes(plate)) {
        return { notUniq: true };
      } else {
        return null;
      }
    };
  }

  private onlyLettersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';

      if (!!value && !/^[a-zA-Z]+$/.test(value)) {
        return { notLetters: true };
      } else {
        return null;
      }
    };
  }
}
