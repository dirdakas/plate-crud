import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { PlateListComponent } from './components/plate-list/plate-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    PlateListComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
