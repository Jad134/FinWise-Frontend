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
    if (this.hasScrolledToBottom()) {
      if (this.nextUrl) {
        this.loadMoreExpenses();
      }
    }
    this.checkMonthChange();
  }

  
  hasScrolledToBottom(): boolean {
    const listContainer = document.querySelector('.list') as HTMLElement;
    return listContainer.scrollTop + listContainer.clientHeight >= listContainer.scrollHeight - 50;
  }


  checkMonthChange() {
    const expenseElements = document.querySelectorAll('.overview-information-container');
    const listContainer = document.querySelector('.list') as HTMLElement;

    for (let i = 0; i < expenseElements.length; i++) {
      const expenseElement = expenseElements[i] as HTMLElement;
      const offsetTop = this.calculateOffsetTop(expenseElement, listContainer);  
      this.triggerMonthChangeOnVisibility(offsetTop, expenseElement)
    }
  }


  calculateOffsetTop(expenseElement: HTMLElement, listContainer: HTMLElement): number {
    const rect = expenseElement.getBoundingClientRect();
    return rect.top - listContainer.getBoundingClientRect().top;
  }


  triggerMonthChangeOnVisibility(offsetTop: any, expenseElement:any) {
    if (offsetTop <= 0 && offsetTop >= -expenseElement.getBoundingClientRect().height) {
      const expenseId = expenseElement.getAttribute('data-expense-id');
      const expense = this.expensesList.find((e: any) => e.id == expenseId);
      this.changeCurrentMonthName(expense)
    }
  }


  changeCurrentMonthName(expense: any) {
    if (expense) {
      const monthName = this.getMonthName(expense.date);

      if (this.currentMonth !== monthName) {
        this.currentMonth = monthName;
        console.log('Aktueller Monat:', this.currentMonth);
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
