import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { PlateListModule } from './pages/plate-list/plate-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./pages').then(m => m.PlateListModule),
      },
    ]),
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    EffectsModule.forRoot([]),
    PlateListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
