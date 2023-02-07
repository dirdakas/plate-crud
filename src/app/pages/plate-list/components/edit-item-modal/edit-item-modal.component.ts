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
import { Store } from '@ngrx/store';

import { ConfirmationModalComponent } from 'src/app/components';
import { IPlateDetails } from 'src/app/models';
import { createPlate, PlateListState, updatePlate } from 'src/app/state';
import { PLATE_NUMBER_REGEX } from '../../models';

export interface IEditItem {
  item?: IPlateDetails;
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
      plate: new FormControl(this.data?.item ? this.data.item?.plate : '', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
        this.uniqPlateValidator(),
        Validators.pattern(PLATE_NUMBER_REGEX),
      ]),
      name: new FormControl(this.data?.item ? this.data.item?.name : '', [
        Validators.required,
        Validators.minLength(2),
        this.onlyLettersValidator(),
      ]),
      lastName: new FormControl(
        this.data?.item ? this.data.item?.lastName : '',
        [
          Validators.required,
          Validators.minLength(2),
          this.onlyLettersValidator(),
        ]
      ),
    });

    this.isCreate = !this.data.item;
  }

  createNewPlate(): void {
    if (this.plateForm.valid) {
      this.store$.dispatch(
        createPlate({
          payload: {
            plate: this.plateForm.value.plate.toUpperCase(),
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

  updatePlate(): void {
    if (this.plateForm.valid) {
      this.store$.dispatch(
        updatePlate({
          payload: {
            plate: this.plateForm.value.plate.toUpperCase(),
            id: (this.data.item as IPlateDetails).id,
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
