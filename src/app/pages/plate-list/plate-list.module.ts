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

import { PlateListComponent } from './plate-list.component';
import {
  PlateListEffects,
  plateListFeatureKey,
  plateListReducer,
} from './../../state';
import { SpinnerModule, ConfirmationModalModule } from 'src/app/components';
import { EditItemModalComponent } from './components/edit-item-modal/edit-item-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
})
export class PlateListModule {}
