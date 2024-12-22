import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Nation, OfferedResource, OwnedResource, WantedResource, TradeAgreement } from './model';
@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'https://localhost:7105/api';  // URL do API
  constructor(private http: HttpClient) {}

  getAllNations(): Observable<Nation[]> {
    return this.http.get<Nation[]>(`${this.apiUrl}/Nation`);
  }

  getNationById(id: number): Observable<Nation> {
    return this.http.get<Nation>(`${this.apiUrl}/Nation/${id}`);
  }

  // createNation(nation: Nation): Observable<Nation> {
  //   return this.http.post<Nation>(this.apiUrl, nation);
  // }

  // updateNation(id: number, nation: Nation): Observable<Nation> {
  //   return this.http.put<Nation>(`${this.apiUrl}/${id}`, nation);
  // }

  // deleteNation(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }


  getOwnedResourceById(id: number): Observable<OwnedResource[]> {
    return this.http.get<OwnedResource[]>(`${this.apiUrl}/Nation/ownedresources/${id}`);
  }

  // createOwnedResource(resource: OwnedResource): Observable<OwnedResource> {
  //   return this.http.post<OwnedResource>(this.apiUrl, resource);
  // }

  // updateOwnedResource(id: number, resource: OwnedResource): Observable<OwnedResource> {
  //   return this.http.put<OwnedResource>(`${this.apiUrl}/${id}`, resource);
  // }

  // deleteOwnedResource(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

  // getAllWantedResources(): Observable<WantedResource[]> {
  //   return this.http.get<WantedResource[]>(this.apiUrl);
  // }

  // getWantedResourceById(id: number): Observable<WantedResource> {
  //   return this.http.get<WantedResource>(`${this.apiUrl}/${id}`);
  // }

  createWantedResources(resource: WantedResource[]): Observable<WantedResource> {
    return this.http.post<WantedResource>(`${this.apiUrl}/Trade/WantedResources`, resource);
  }

  // updateWantedResource(id: number, resource: WantedResource): Observable<WantedResource> {
  //   return this.http.put<WantedResource>(`${this.apiUrl}/${id}`, resource);
  // }

  // deleteWantedResource(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
  // getAllOfferedResources(): Observable<OfferedResource[]> {
  //   return this.http.get<OfferedResource[]>(this.apiUrl);
  // }

  // getOfferedResourceById(id: number): Observable<OfferedResource> {
  //   return this.http.get<OfferedResource>(`${this.apiUrl}/${id}`);
  // }

  createOfferedResources(resource: OfferedResource[]): Observable<OfferedResource> {
    return this.http.post<OfferedResource>(`${this.apiUrl}/Trade/OfferedResources`, resource);
  }

  // updateOfferedResource(id: number, resource: OfferedResource): Observable<OfferedResource> {
  //   return this.http.put<OfferedResource>(`${this.apiUrl}/${id}`, resource);
  // }

  // deleteOfferedResource(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
  // getAllTradeAgreements(): Observable<TradeAgreement[]> {
  //   return this.http.get<TradeAgreement[]>(this.apiUrl);
  // }

  // getTradeAgreementById(id: number): Observable<TradeAgreement> {
  //   return this.http.get<TradeAgreement>(`${this.apiUrl}/${id}`);
  // }

  createTradeAgreement(agreement: TradeAgreement): Observable<TradeAgreement> {
    return this.http.post<TradeAgreement>(`${this.apiUrl}/Trade/TradeAgreement`, agreement);
  }

  // updateTradeAgreement(id: number, agreement: TradeAgreement): Observable<TradeAgreement> {
  //   return this.http.put<TradeAgreement>(`${this.apiUrl}/${id}`, agreement);
  // }

  // deleteTradeAgreement(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}

