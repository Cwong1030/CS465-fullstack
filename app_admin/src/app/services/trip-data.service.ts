import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    private httpClient: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  public getTrips(): Observable<Trip[]> {
    return this.httpClient.get<Trip[]>(`${this.apiBaseUrl}/trips`);
  }

  public addTrip(formData: Trip): Observable<Trip> {
    return this.httpClient.post<Trip>(`${this.apiBaseUrl}/trips`, formData);
  }

  public getTrip(tripCode: string): Observable<Trip> {
    return this.httpClient
    .get<Trip>(`${this.apiBaseUrl}/trips/${tripCode}`);
  }

  public updateTrip(formData: Trip): Observable<Trip> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };
    return this.httpClient
    .put<Trip>(`${this.apiBaseUrl}/trips/${formData.code}`, formData, httpOptions);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  private makeAuthApiCall(urlPath: string, user: User):
  Promise<AuthResponse> {                                    
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.httpClient
      .post(url, user)                                         
      .toPromise()                                             
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }
  
}
