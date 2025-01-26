import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nation, User, AccessToNation } from './nation-model';  // Upewnij się, że masz modele



@Injectable({
  providedIn: 'root'
})
export class NationAssignService {

  private apiUrl = 'https://localhost:7105/api';  // URL do API
  constructor(private http: HttpClient) { }


  getNations(): Observable<Nation[]> {
    return this.http.get<Nation[]>(`${this.apiUrl}/Nations`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/Users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/Users/${id}`);
  }
  getAccessToNation(): Observable<AccessToNation[]> {
    return this.http.get<AccessToNation[]>(`${this.apiUrl}/Assignments`);
  }

  addAccessToNations(resources: AccessToNation[]): Observable<AccessToNation[]> {
    return this.http.post<AccessToNation[]>(`${this.apiUrl}/Assignments`, resources);
  }

  updateAccessToNations(resources: AccessToNation[]): Observable<any> {
    return this.http.put<AccessToNation[]>(`${this.apiUrl}/Assignments`, resources);
  }

  deleteAccessToNations(ids: number[]): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/Assignments`, { body: ids });
  }







}
