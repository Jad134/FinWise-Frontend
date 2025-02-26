import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiUrlsService } from './api-urls.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) {}

  apiService = inject(ApiUrlsService)

  getTotalBalance(): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${sessionStorage.getItem('token')}`  // Token aus localStorage holen
    });
  
    return this.http.get<{ total_balance: number }>(
      this.apiService.TOTAL_BALANCE_URL,
      { headers }
    ).pipe(
      map(response => response.total_balance)
    );
  }
  
  
}
