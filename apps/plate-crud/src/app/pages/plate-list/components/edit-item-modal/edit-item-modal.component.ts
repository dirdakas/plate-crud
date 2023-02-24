import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ConfirmationModalComponent } from '../../../../components';
import { IPlateDetails } from '../../../../models';
import { createPlate, PlateListState, updatePlate } from '../../../../state';
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
export class EditItemModalComponent implements OnInit {
  plateForm: FormGroup;
  isCreate = true;
  isLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: IEditItem,
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    private fb: FormBuilder,
    private store$: Store<PlateListState>
  ) {}

  ngOnInit(): void {
    this.isCreate = !this.data.item;

    this.initForm();
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

  private initForm(): void {
    this.plateForm = this.fb.group({
      plate: [
        this.data?.item ? this.data.item?.plate : '',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
          this.uniqPlateValidator(),
          Validators.pattern(PLATE_NUMBER_REGEX),
        ],
      ],
      name: [
        this.data?.item ? this.data.item?.name : '',
        [
          Validators.required,
          Validators.minLength(2),
          this.onlyLettersValidator(),
        ],
      ],
      lastName: [
        this.data?.item ? this.data.item?.lastName : '',
        [
          Validators.required,
          Validators.minLength(2),
          this.onlyLettersValidator(),
        ],
      ],
    });

    this.isLoading = false;
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
