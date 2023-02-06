import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPlateDetails } from 'src/app/models';

import { deletePlate, getPlateList, initiatePlateList } from 'src/app/state';
import { EditItemModalComponent } from './components';
import { PlateListComponent } from './plate-list.component';

describe('PlateListComponent', () => {
  let component: PlateListComponent;
  let fixture: ComponentFixture<PlateListComponent>;

  let store: MockStore<unknown>;
  const mockedPlateItem: IPlateDetails = {
    lastName: 'lastName',
    name: 'name',
    plate: 'plate',
    id: 0,
  };
  const mockedDialog = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    open: (component: any, data: any) => ({
      afterClosed: () => afterClosedResult$,
    }),
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
          useValue: mockedDialog,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(getPlateList, []);

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
      spyOn(store, 'dispatch');

      component.ngOnInit();

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
      spyOn(store, 'dispatch');

      component.deleteItem(mockedPlateItem);

      expect(store.dispatch).toHaveBeenCalledWith(
        deletePlate({ payload: mockedPlateItem })
      );
    });

    it('should not dispatch delete event', () => {
      behSubRes.next(false);
      spyOn(store, 'dispatch');

      component.deleteItem(mockedPlateItem);

      expect(store.dispatch).not.toHaveBeenCalledWith(
        deletePlate({ payload: mockedPlateItem })
      );
    });
  });

  describe('addItem', () => {
    it('should open modal for new item creation', () => {
      spyOn(mockedDialog, 'open').and.callThrough();
      store.overrideSelector(getPlateList, [mockedPlateItem]);
      store.refreshState();

      component.addItem();

      expect(mockedDialog.open).toHaveBeenCalled();
      expect(mockedDialog.open).toHaveBeenCalledWith(EditItemModalComponent, {
        data: {
          currPlates: [mockedPlateItem.plate],
        },
      });
    });
  });

  describe('editItem', () => {
    it('should open modal for edit item', () => {
      spyOn(mockedDialog, 'open').and.callThrough();

      component.editItem(mockedPlateItem);

      expect(mockedDialog.open).toHaveBeenCalled();
      expect(mockedDialog.open).toHaveBeenCalledWith(EditItemModalComponent, {
        data: {
          item: mockedPlateItem,
          currPlates: [],
        },
      });
    });
  });
});
