import { Component, inject } from '@angular/core';
import { FinanceService } from '../../../services/shared-functions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-white',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-white.component.html',
  styleUrl: './transaction-white.component.scss'
})
export class TransactionWhiteComponent {
  constructor() {
    this.getAllExpenses()
  }

  sharedFunctionService = inject(FinanceService)
  expensesList: any[] = [];
  nextUrl: string | null = null;  // Für die Pagination


  getAllExpenses() {
    this.sharedFunctionService.getLazyLoadingExpenses().subscribe((response: any) => {
      this.expensesList = response.results;  // Speichern der erhaltenen Daten
      this.nextUrl = response.next;  // Setze die 'next' URL für das Lazy Loading
      console.log('All expenses:', this.expensesList);
    });
  }

  onScroll() {
    const element = document.querySelector('.list') as HTMLElement;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 50) {
      if (this.nextUrl) {
        this.loadMoreExpenses();
      }
    }
  }


  loadMoreExpenses() {
    if (this.nextUrl) {
      this.sharedFunctionService.getLazyLoadingExpenses(this.nextUrl).subscribe((response: any) => {
        this.expensesList = [...this.expensesList, ...response.results];
        this.nextUrl = response.next;  // Setze die 'next' URL für weitere Anfragen
        console.log('More expenses loaded:', this.expensesList);
      });
    }
  }
}
