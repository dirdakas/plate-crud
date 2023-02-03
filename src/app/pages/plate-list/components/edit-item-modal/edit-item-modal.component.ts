import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss'],
})
export class EditItemModalComponent {
  isCreate = true;
  plateForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ITableItem,
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    private fb: FormBuilder,
    private store$: Store<PlateListState>
  ) {
    this.plateForm = this.fb.group({
      plate: new FormControl(this.data ? this.data.plate : '', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
        // uniq validator
        // pattern validator
      ]),
      name: new FormControl(this.data ? this.data.name : '', [
        Validators.required,
        Validators.minLength(2),
        // string validator
      ]),
      lastName: new FormControl(this.data ? this.data.lastName : '', [
        Validators.required,
        Validators.minLength(2),
        // string validator
      ]),
    });

    this.isCreate = !this.data;
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
            index: this.data.index,
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
}
