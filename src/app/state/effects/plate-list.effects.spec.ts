import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { marbles } from 'rxjs-marbles';

import { IPlateDetails } from 'src/app/models';
import { getPlateListSuccess, initiatePlateList } from '../actions';
import { PlateListEffects } from './plate-list.effects';
import dataFile from 'src/assets/data.json';

describe('PlateListEffects', () => {
  let effects: PlateListEffects;
  let actions$: Observable<Action>;
  let mockStore: MockStore<unknown>;

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

  describe('getPrivateInitialData$', () => {
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
});
