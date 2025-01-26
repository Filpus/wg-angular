import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource, Culture, Religion, Group, Localisation } from './model';  // Upewnij się, że masz modele

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private apiUrl = 'https://localhost:7105/api';  // URL do API
  constructor(private http: HttpClient) { }

  // Zasoby (Resources)
  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/Resources`);
  }

  getResourceById(id: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.apiUrl}/Resources/${id}`);
  }

  addResources(resources: Resource[]): Observable<Resource[]> {
    return this.http.post<Resource[]>(`${this.apiUrl}/Resources`, resources);
  }

  updateResources(resources: Resource[]): Observable<any> {
    return this.http.put<void>(`${this.apiUrl}/Resources`, resources);
  }

  deleteResources(ids: number[]): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/Resources`, { body: ids });
  }

  // Kultury (Cultures)
  getCultures(): Observable<Culture[]> {
    return this.http.get<Culture[]>(`${this.apiUrl}/Cultures`);
  }

  getCultureById(id: number): Observable<Culture> {
    return this.http.get<Culture>(`${this.apiUrl}/Cultures/${id}`);
  }

  addCultures(cultures: Culture[]): Observable<Culture[]> {
    return this.http.post<Culture[]>(`${this.apiUrl}/Cultures`, cultures);
  }

  updateCultures(cultures: Culture[]): Observable<any> {
    return this.http.put<void>(`${this.apiUrl}/Cultures`, cultures);
  }

  deleteCultures(ids: number[]): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/Cultures`, { body: ids });
  }

  // Religie (Religions)
  getReligions(): Observable<Religion[]> {
    return this.http.get<Religion[]>(`${this.apiUrl}/Religions`);
  }

  getReligionById(id: number): Observable<Religion> {
    return this.http.get<Religion>(`${this.apiUrl}/religions/${id}`);
  }

  addReligions(religions: Religion[]): Observable<Religion[]> {
    return this.http.post<Religion[]>(`${this.apiUrl}/religions`, religions);
  }

  updateReligions(religions: Religion[]): Observable<any> {
    return this.http.put<void>(`${this.apiUrl}/religions`, religions);
  }

  deleteReligions(ids: number[]): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/religions`, { body: ids });
  }

  // Grupy społeczne (Groups)
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/SocialGroups`);
  }

  getGroupById(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/SocialGroups/${id}`);
  }

  addGroups(groups: Group[]): Observable<Group[]> {
    return this.http.post<Group[]>(`${this.apiUrl}/SocialGroups`, groups);
  }

  updateGroups(groups: Group[]): Observable<any> {
    return this.http.put<void>(`${this.apiUrl}/SocialGroups`, groups);
  }

  deleteGroups(ids: number[]): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/SocialGroups`, { body: ids });
  }

  getLocalisations(): Observable<Localisation[]> {
    return this.http.get<Localisation[]>(`${this.apiUrl}/Localisations`);
  }

  getLocalisationsById(id: number): Observable<Localisation> {
    return this.http.get<Localisation>(`${this.apiUrl}/Localisations/${id}`);
  }

  addLocalisations(localisations: Localisation[]): Observable<Religion[]> {
    return this.http.post<Localisation[]>(`${this.apiUrl}/Localisations`, localisations);
  }

  updateLocalisations(localisations: Localisation[]): Observable<any> {
    return this.http.put<void>(`${this.apiUrl}/Localisations`, localisations);
  }

  deleteLocalisations(ids: number[]): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/Localisations`, { body: ids });
  }
}
