import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getSlides(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/slides`);
  }

  getPoints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/points`);
  }

  getDownloadItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/downloads`);
  }

  getInitiatives(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/initiatives`);
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/services`);
  }

  getCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cards`);
  }
}