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
    return this.httpClient.get<IPlateDetails[]>(`${SERVER}/plate-list`);
  }

  createPlate(plate: IPlateDetails): Observable<IPlateDetails> {
    console.log('createPlate', plate);
    return this.httpClient.post<IPlateDetails>(`${SERVER}/create-plate`, {
      ...plate,
    });
  }

  updatePlate(plate: IPlateDetails): Observable<IPlateDetails> {
    console.log('updatePlate', plate);
    return this.httpClient.post<IPlateDetails>(`${SERVER}/update-plate`, {
      ...plate,
    });
  }

  deletePlate(plate: IPlateDetails): Observable<IPlateDetails> {
    console.log('delete', plate);
    return this.httpClient.post<IPlateDetails>(`${SERVER}/delete-plate`, {
      ...plate,
    });
  }
}
