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


  getAuthToken(){
   return new HttpHeaders({
      'Authorization': `Token ${sessionStorage.getItem('token')}` 
    });
  }

  getTotalBalance(): Observable<number> {
    const headers = this.getAuthToken()
  
    return this.http.get<{ total_balance: number }>(
      this.apiService.TOTAL_BALANCE_URL,
      { headers }
    ).pipe(
      map(response => response.total_balance)
    );
  }

  getTotalExpenses(): Observable<number> {
    const headers = this.getAuthToken()

    return this.http.get<{ total_expenses: number }>(
      this.apiService.TOTAL_BALANCE_URL,
      { headers }
    ).pipe(
      map(response => response.total_expenses)
    ); 
  }

  getTargetSavings(){
    const headers = this.getAuthToken()

    return this.http.get<{ target_savings: number }>(
      this.apiService.TOTAL_BALANCE_URL,
      { headers }
    ).pipe(
      map(response => response.target_savings)
    ); 
  }


  getFilteredExpenses(filter: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = this.getAuthToken()
    const url = `http://127.0.0.1:8000/api/expense/?filter=${filter}`;
    
    return this.http.get(url, { headers });
  }
  

  getIncome(period: string): Observable<any> {
    const headers = this.getAuthToken()
    return this.http.get(`${this.apiService.INCOME_AMOUNT_URL}?period=${period}`, { headers });
  }

  
  getExpenses(period: string): Observable<any> {
    const headers = this.getAuthToken()
    return this.http.get(`${this.apiService.EXPENSE_AMOUNT_URL}?period=${period}`, { headers });
  }

  
  getTopCategories(): Observable<any> {
    const headers = this.getAuthToken();
    const url = this.apiService.TOP_CATEGORIES_URL;

    return this.http.get(url, { headers });
}
  
}
