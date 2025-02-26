import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiUrlsService } from './api-urls.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private http: HttpClient) {}

  apiService = inject(ApiUrlsService)

  getTotalBalance(): Observable<number> {
    return this.http.get<{ total_balance: number }>(this.apiService.TOTAL_BALANCE_URL)
      .pipe(
        map(response => response.total_balance) // Extrahiert nur den Zahlenwert
      );
  }
  
  
}
