import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateListComponent } from './plate-list.component';
import dataFile from 'src/assets/data.json';
import { IPlateDetails } from 'src/app/models/plate-details.model';

describe('PlateListComponent', () => {
  let component: PlateListComponent;
  let fixture: ComponentFixture<PlateListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateListComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set page size options correctly', () => {
    expect(component.pageSizeOptions).toEqual([5, 10, 20]);
  });

  it('should load data from file', () => {
    expect(component.dataSource.data).toEqual(dataFile.dataList.map((item: IPlateDetails, index: number) => ({...item, index})));
  });
});
