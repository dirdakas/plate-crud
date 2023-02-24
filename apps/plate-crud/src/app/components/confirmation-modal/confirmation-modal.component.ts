import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IConfirmationModal } from '../../models';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirmationModal,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }
}
