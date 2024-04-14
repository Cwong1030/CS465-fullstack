import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  constructor(private httpClient: HttpClient) {}
  url = 'http://localhost:3000/api/trips';

  getTrips() : Observable<Trip[]> {
    // console.log('Inside TripDataService::getTrips');
    return this.httpClient.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    // console.log('Inside TripDataService::addTrips');
    return this.httpClient.post<Trip>(this.url, formData);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    // console.log('Inside TripDataService::getTrips');
    return this.httpClient.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    // console.log('Inside TripDataService::addTrips');
    return this.httpClient.put<Trip>(this.url + '/' + formData.code, formData);
  }

}
