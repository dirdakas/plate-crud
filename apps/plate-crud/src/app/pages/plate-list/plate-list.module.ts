import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { PlateListComponent } from './plate-list.component';
import {
  PlateListEffects,
  plateListFeatureKey,
  plateListReducer,
} from './../../state';
import { EditItemModalComponent } from './components/edit-item-modal/edit-item-modal.component';
import { PlateService } from '../../services';
import { SpinnerModule, ConfirmationModalModule } from '../../components';

@NgModule({
  declarations: [PlateListComponent, EditItemModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlateListComponent,
      },
    ]),
    MatTableModule,
    MatPaginatorModule,
    StoreModule.forFeature(plateListFeatureKey, plateListReducer),
    EffectsModule.forFeature([PlateListEffects]),
    SpinnerModule,
    MatButtonModule,
    MatIconModule,
    ConfirmationModalModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [PlateService],
})
export class PlateListModule {}
