import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BehaviorSubject, Observable } from 'rxjs';

import { ITableItem } from 'src/app/models';
import { deletePlate, getPlateList, initiatePlateList } from 'src/app/state';
import { PlateListComponent } from './plate-list.component';

describe('PlateListComponent', () => {
  let component: PlateListComponent;
  let fixture: ComponentFixture<PlateListComponent>;

  let store: MockStore<unknown>;
  const mockedPlateItem: ITableItem = {
    lastName: 'lastName',
    name: 'name',
    plate: 'plate',
    index: 0,
  };

  const behSubRes: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  const afterClosedResult$: Observable<boolean> = behSubRes;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [PlateListComponent],
      providers: [
        provideMockStore<unknown>({
          initialState: {
            isLoading: false,
            isLoaded: false,
          },
        }),
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => afterClosedResult$,
            }),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');

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

  describe('ngOnInit', () => {
    it('should dispatch data fetch', () => {
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(initiatePlateList());
    });

    it('should set list', () => {
      expect(component.dataSource.data).toEqual([]);

      store.overrideSelector(getPlateList, [mockedPlateItem]);
      store.refreshState();

      expect(component.dataSource.data).toEqual([mockedPlateItem]);
    });
  });

  describe('deleteItem', () => {
    it('should dispatch delete event', () => {
      behSubRes.next(true);
      component.deleteItem(mockedPlateItem);

      expect(store.dispatch).toHaveBeenCalledWith(deletePlate(mockedPlateItem));
    });

    it('should not dispatch delete event', () => {
      behSubRes.next(false);
      component.deleteItem(mockedPlateItem);

      expect(store.dispatch).not.toHaveBeenCalledWith(
        deletePlate(mockedPlateItem)
      );
    });
  });
});
