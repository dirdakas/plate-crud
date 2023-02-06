import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlateDetails } from '../models';

const SERVER = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class PlateService {
  constructor(private httpClient: HttpClient) {}

  getPlates(): Observable<IPlateDetails[]> {
    return this.httpClient.get<IPlateDetails[]>(`${SERVER}/plates`);
  }

  // createPlate(plate: IPlateDetails): Observable<any> {
  //   console.log('createPlate', plate);
  //   return this.httpClient.post<any>(`${SERVER}/create-plate`, {
  //     plate: plate.plate,
  //     name: plate.name,
  //     lastName: plate.lastName,
  //   });
  // }
}
