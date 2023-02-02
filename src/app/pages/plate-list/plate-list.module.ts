import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { PlateListComponent } from './plate-list.component';
import { PlateListEffects, plateListFeatureKey, plateListReducer } from './../../state';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';

@NgModule({
  declarations: [ PlateListComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlateListComponent
      },
    ]),
    MatTableModule,
    MatPaginatorModule,
    StoreModule.forFeature( plateListFeatureKey, plateListReducer),
    EffectsModule.forFeature([PlateListEffects]),
    SpinnerModule,
  ]
})
export class PlateListModule { }
