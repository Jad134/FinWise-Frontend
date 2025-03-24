import { Component, inject, AfterViewInit } from '@angular/core';
import { FinanceService } from '../../../services/shared-functions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-white',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-white.component.html',
  styleUrl: './transaction-white.component.scss'
})
export class TransactionWhiteComponent implements AfterViewInit {
  sharedFunctionService = inject(FinanceService);
  expensesList: any[] = [];
  nextUrl: string | null = null;
  currentMonth: string = '';
  isLoading = false;

  constructor() {
    this.getAllExpenses();
  }

  ngAfterViewInit() {
    this.setupScrollListener();
  }


  getAllExpenses() {
    this.sharedFunctionService.getLazyLoadingExpenses().subscribe((response: any) => {
      this.expensesList = response.results;
      this.nextUrl = response.next;
      console.log(this.expensesList);
      this.setCurrentMonthOnInit()
    });
  }

  setCurrentMonthOnInit() {
   let currentDate = this.expensesList[0].date
   let currentMonth = this.getMonthName(currentDate)
   this.currentMonth = currentMonth
  }

  loadMoreExpenses() {
    if (this.isLoading || !this.nextUrl) return;

    this.isLoading = true;
    this.sharedFunctionService.getLazyLoadingExpenses(this.nextUrl).subscribe((response: any) => {
      this.expensesList = [...this.expensesList, ...response.results];
      this.nextUrl = response.next;
      this.isLoading = false;
      console.log(this.expensesList)
    });
  }


  setupScrollListener() {
    const listContainer = document.querySelector('.list') as HTMLElement;
    listContainer.addEventListener('scroll', this.onScroll.bind(this));
    this.onScroll();
  }


  onScroll() {
    if (this.isLoading) return;

    const listContainer = document.querySelector('.list') as HTMLElement;

    if (listContainer.scrollTop + listContainer.clientHeight >= listContainer.scrollHeight - 50) {
      if (this.nextUrl) {
        this.loadMoreExpenses();
      }
    }
    this.checkMonthChange();
  }


  checkMonthChange() {
    const expenseElements = document.querySelectorAll('.overview-information-container');
    const listContainer = document.querySelector('.list') as HTMLElement;

    for (let i = 0; i < expenseElements.length; i++) {
      const expenseElement = expenseElements[i];
      const rect = expenseElement.getBoundingClientRect();
      const offsetTop = rect.top - listContainer.getBoundingClientRect().top;

      if (offsetTop <= 0 && offsetTop >= -rect.height) {
        const expenseId = expenseElement.getAttribute('data-expense-id');
        const expense = this.expensesList.find((e: any) => e.id == expenseId);

        if (expense) {
          const monthName = this.getMonthName(expense.date);

          if (this.currentMonth !== monthName) {
            this.currentMonth = monthName;
            console.log('Aktueller Monat:', this.currentMonth);
            break;
          }
        }
      }
    }
  }


  getMonthName(date: string): string {
    const monthNames = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    const month = new Date(date).getMonth();
    return monthNames[month];
  }
}
