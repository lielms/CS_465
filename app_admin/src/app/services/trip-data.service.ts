import { Inject, Injectable } from '@angular/core';

import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }


  private apiBaseUrl: string = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public login(user: User, passwd: string): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user, passwd);
  }
  public register(user: User, passwd: string): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user, passwd);
  }

  private makeAuthApiCall(urlPath: string, user: User, passwd: string): Promise<AuthResponse> {
    const url = `${this.apiBaseUrl}${urlPath}`;
    return this.http
      .post<AuthResponse>(url, {
        name: user.name,
        email: user.email,
        password: passwd
      })
      .toPromise()
      .catch(this.handleError);
  }


  url = 'http://localhost:3000/api/trips';

  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    const token = this.storage.getItem('travlr-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
  });
    return this.http.post<Trip>(this.url, formData, { headers})
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    // console.log('Inside TripDataService::getTrips');
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }
  
  updateTrip(formData: Trip) : Observable<Trip> {
    const token = this.storage.getItem('travlr-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
  });
    // console.log('Inside TripDataService::addTrips');
    return this.http.put<Trip>(this.url + '/' + formData.code, formData, { headers });
  }
}
