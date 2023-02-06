import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PlateService } from './plate.service';
import { IPlateDetails } from '../models';

describe('PlateService', () => {
  let service: PlateService;
  let httpTestingController: HttpTestingController;
  const mockPlate: IPlateDetails = {
    lastName: 'lastName',
    plate: 'plate',
    name: 'name',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PlateService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returned Observable should match the right data', done => {
    service.getPlates().subscribe(data => {
      expect(data[0]).toEqual(mockPlate);
      done();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/plates');

    req.flush([mockPlate]);
  });
});
