import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {

  constructor() { }

  BASE_URL = 'http://127.0.0.1:8000/api';
  REGISTER_URL = `${this.BASE_URL}/registration/`;
  LOGIN_URL = `${this.BASE_URL}/login/`;
  TOTAL_BALANCE_URL = `${this.BASE_URL}/overview/`;
  INCOME_AMOUNT_URL = `${this.BASE_URL}/income/`;
  EXPENSE_AMOUNT_URL = `${this.BASE_URL}/expense/`
}
