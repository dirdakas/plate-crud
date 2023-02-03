import { ITableItem } from 'src/app/models';
import {
  getNewPlateIndex,
  getPlateList,
  getPlateListState,
  isLoaded,
  isLoading,
} from './plate-list.selectors';

describe('Plate-List Flow Selectors', () => {
  const mockedPlate: ITableItem = {
    plate: 'plate',
    name: 'name',
    lastName: 'lastName',
    index: 0,
  };

  it('getSecurityTokenState should return current slice of state', () => {
    expect(
      getPlateListState.projector({
        isLoading: false,
        isLoaded: false,
      })
    ).toEqual({
      isLoading: false,
      isLoaded: false,
    });
  });

  describe('isLoading', () => {
    it('should return true if data is being fetched', () => {
      expect(isLoading.projector({ isLoading: true })).toBe(true);
    });

    it('should return false if no store was created', () => {
      expect(isLoading.projector(undefined)).toBe(false);
    });
  });

  it('isLoaded should return true if data loaded', () => {
    expect(isLoaded.projector({ isLoaded: true })).toBe(true);
  });

  describe('getPlateList', () => {
    it('should return empty list if contains no data', () => {
      expect(getPlateList.projector({})).toEqual([]);
    });

    it('should return list', () => {
      expect(getPlateList.projector({ data: [mockedPlate] })).toEqual([
        mockedPlate,
      ]);
    });
  });

  describe('getNewPlateIndex', () => {
    it('should return new index', () => {
      expect(
        getNewPlateIndex.projector({
          data: [mockedPlate],
        })
      ).toEqual(1);
    });
  });
});
