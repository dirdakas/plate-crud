import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { marbles } from 'rxjs-marbles';

import { IPlateDetails, ITableItem } from 'src/app/models';
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
import dataFile from 'src/assets/data.json';
import { getPlateList } from '../selectors';

describe('PlateListEffects', () => {
  let effects: PlateListEffects;
  let actions$: Observable<Action>;
  let mockStore: MockStore<unknown>;
  const mockedPlateItem: ITableItem = {
    lastName: 'lastName',
    name: 'name',
    plate: 'plate',
    index: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlateListEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });
    mockStore = TestBed.inject(MockStore);
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
        const action: Action = initiatePlateList();
        const completion = getPlateListSuccess({
          payload:
            dataFile.dataList?.map((item: IPlateDetails, index: number) => ({
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
