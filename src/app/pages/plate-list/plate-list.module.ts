import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { PlateListComponent } from './plate-list.component';

@NgModule({
  declarations: [ PlateListComponent ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PlateListComponent
      },
    ]),
    MatTableModule,
    MatPaginatorModule
  ]
})
export class PlateListModule { }
