import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.httpClient.get<Trip>(`${this.apiBaseUrl}/trips/${tripCode}`);
  }

  public updateTrip(formData: Trip): Observable<Trip> {
    return this.httpClient.put<Trip>(`${this.apiBaseUrl}/trips/${formData.code}`, formData);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private async makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    try {
      const response = await firstValueFrom(this.httpClient.post<AuthResponse>(url, user));
      return response;
    } catch (error) {
      console.error('Error making auth API call:', error);
      throw error; // Re-throw the error for further handling if needed
    }
  } 
  
}
