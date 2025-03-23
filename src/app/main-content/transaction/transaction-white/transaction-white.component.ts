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
  nextUrl: string | null = null;



  getAllExpenses() {
    this.sharedFunctionService.getLazyLoadingExpenses().subscribe((response: any) => {
      this.expensesList = response.results;
      this.nextUrl = response.next;
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
        this.nextUrl = response.next;
        console.log('More expenses loaded:', this.expensesList);
      });
    }
  }

  
  // Prüfen, ob es sich um einen neuen Monat handelt
  isNewMonth(expense: any, index: number): boolean {
    if (index === 0) {
      return true; // Bei der ersten Ausgabe immer anzeigen
    }

    const previousExpense = this.expensesList[index - 1];
    const currentExpenseMonth = new Date(expense.date).getMonth();
    const previousExpenseMonth = new Date(previousExpense.date).getMonth();

    return currentExpenseMonth !== previousExpenseMonth; // Wenn der Monat unterschiedlich ist
  }

  // Monatsnamen aus dem Datum holen
  getMonthName(date: string): string {
    const monthNames = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    const month = new Date(date).getMonth();
    return monthNames[month]; // Gibt den Monatsnamen zurück
  }

}
