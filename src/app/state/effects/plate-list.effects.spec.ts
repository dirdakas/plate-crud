import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { marbles } from 'rxjs-marbles';

import { IPlateDetails } from 'src/app/models';
import {
  createPlate,
  createPlateSuccess,
  deletePlate,
  deletePlateSuccess,
  getPlateListSuccess,
  initiatePlateList,
  updatePlate,
  updatePlateSuccess,
} from '../actions';
import { PlateListEffects } from './plate-list.effects';
import dataFile from 'server/db.json';
import { getPlateList } from '../selectors';
import { HttpClientModule } from '@angular/common/http';
import { PlateService } from 'src/app/services';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('PlateListEffects', () => {
  let effects: PlateListEffects;
  let actions$: Observable<Action>;
  let mockStore: MockStore<unknown>;
  let mockedPlateService;
  let mockedMatSnackBar;
  const mockedPlateItem: IPlateDetails = {
    lastName: 'lastName',
    name: 'name',
    plate: 'plate',
    id: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        PlateListEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        PlateService,
        MatSnackBar,
      ],
    });
    mockStore = TestBed.inject(MockStore);
    mockedPlateService = TestBed.inject(PlateService);
    mockedMatSnackBar = TestBed.inject(MatSnackBar);
    effects = TestBed.inject(PlateListEffects);
    actions$ = TestBed.inject(Actions);
    mockStore.refreshState();
  });

  afterAll(() => {
    mockStore.resetSelectors();
  });

  it('should be created', () => {
    expect(effects).toBeDefined();
  });

  describe('initiatePlateList$', () => {
    it(
      'should fetch data and re-map it',
      marbles(m => {
        spyOn(mockedPlateService, 'getPlates').and.returnValue(
          of(dataFile.plates)
        );
        spyOn(mockedMatSnackBar, 'open').and.callThrough();
        const action: Action = initiatePlateList();
        const completion = getPlateListSuccess({
          payload:
            dataFile.plates?.map((item: IPlateDetails, index: number) => ({
              ...item,
              index,
            })) || [],
          type: 'aa',
        } as any);

        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', {
          b: completion,
        });

        m.expect(effects.initiatePlateList$).toBeObservable(expected);
      })
    );
  });

  describe('deletePlate$', () => {
    beforeEach(() => {
      spyOn(mockedPlateService, 'deletePlate').and.returnValue(
        of(mockedPlateItem)
      );
      spyOn(mockedMatSnackBar, 'open').and.callThrough();
    });

    it(
      'should remove item from list',
      marbles(m => {
        const action: Action = deletePlate(mockedPlateItem);
        const completion = deletePlateSuccess({ payload: [] });
        mockStore.overrideSelector(getPlateList, [mockedPlateItem]);
        mockStore.refreshState();

        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', {
          b: completion,
        });

        m.expect(effects.deletePlate$).toBeObservable(expected);
      })
    );

    it(
      'should return empty list, since initial list is empty',
      marbles(m => {
        const action: Action = deletePlate(mockedPlateItem);
        const completion = deletePlateSuccess({ payload: [] });
        mockStore.overrideSelector(getPlateList, []);
        mockStore.refreshState();

        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', {
          b: completion,
        });

        m.expect(effects.deletePlate$).toBeObservable(expected);
      })
    );
  });

  describe('createPlate$', () => {
    beforeEach(() => {
      spyOn(mockedPlateService, 'createPlate').and.returnValue(
        of(mockedPlateItem)
      );
      spyOn(mockedMatSnackBar, 'open').and.callThrough();
    });

    it(
      'should add new plate to the list, initial list is empty',
      marbles(m => {
        const action: Action = createPlate({ payload: mockedPlateItem });
        const completion = createPlateSuccess({ payload: [mockedPlateItem] });
        mockStore.overrideSelector(getPlateList, []);
        mockStore.refreshState();

        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', {
          b: completion,
        });

        m.expect(effects.createPlate$).toBeObservable(expected);
      })
    );

    it(
      'should add new plate to the list',
      marbles(m => {
        const action: Action = createPlate({ payload: mockedPlateItem });
        const completion = createPlateSuccess({
          payload: [mockedPlateItem, mockedPlateItem],
        });
        mockStore.overrideSelector(getPlateList, [mockedPlateItem]);
        mockStore.refreshState();

        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', {
          b: completion,
        });

        m.expect(effects.createPlate$).toBeObservable(expected);
      })
    );
  });

  describe('updatePlate$', () => {
    it(
      'should add new plate to the list, initial list is empty (should never be the case)',
      marbles(m => {
        spyOn(mockedPlateService, 'updatePlate').and.returnValue(
          of(mockedPlateItem)
        );
        spyOn(mockedMatSnackBar, 'open').and.callThrough();
        const action: Action = updatePlate({ payload: mockedPlateItem });
        const completion = updatePlateSuccess({ payload: [mockedPlateItem] });
        mockStore.overrideSelector(getPlateList, []);
        mockStore.refreshState();

        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', {
          b: completion,
        });

        m.expect(effects.updatePlate$).toBeObservable(expected);
      })
    );

    it(
      'should update plate and return updated list',
      marbles(m => {
        spyOn(mockedPlateService, 'updatePlate').and.returnValue(
          of({ ...mockedPlateItem, plate: 'zxc123' })
        );
        spyOn(mockedMatSnackBar, 'open').and.callThrough();
        const action: Action = updatePlate({
          payload: { ...mockedPlateItem, plate: 'zxc123' },
        });
        const completion = updatePlateSuccess({
          payload: [{ ...mockedPlateItem, plate: 'zxc123' }],
        });
        mockStore.overrideSelector(getPlateList, [mockedPlateItem]);
        mockStore.refreshState();

        actions$ = m.hot('--a', { a: action });
        const expected = m.cold('--b', {
          b: completion,
        });

        m.expect(effects.updatePlate$).toBeObservable(expected);
      })
    );
  });
});
