import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource, Population } from '../dictionary-management/model';  // Upewnij się, że masz modele

@Injectable({
  providedIn: 'root'
})
export class PopulationManagementService {

  private apiUrl = 'https://localhost:7105/api';  // URL do API
  constructor(private http: HttpClient) { }

  getPopulation(): Observable<Population[]> {
    return this.http.get<Population[]>(`${this.apiUrl}/Populations`);
  }

  getPopulationById(id: number): Observable<Population> {
    return this.http.get<Population>(`${this.apiUrl}/Populations/${id}`);
  }

  addPopulation(population: Population): Observable<Population> {
    return this.http.post<Population>(`${this.apiUrl}/Populations`, population);
  }

  updatePopulations(populations: Population[]): Observable<any> {
    return this.http.put<Population[]>(`${this.apiUrl}/Populations`, populations);
  }

  deletePopulations(ids: number[]): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/Populations`, { body: ids });
  }

}
