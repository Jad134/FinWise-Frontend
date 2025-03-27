import { Component, inject, AfterViewInit, ViewEncapsulation, ViewChild} from '@angular/core';
import { FinanceService } from '../../../services/shared-functions.service';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';  // Importiere FormsModule

@Component({
  selector: 'app-transaction-white',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, CalendarModule, FormsModule,DatePickerModule,],
  templateUrl: './transaction-white.component.html',
  styleUrls: ['./transaction-white.component.scss'],
  
})
export class TransactionWhiteComponent implements AfterViewInit {
  sharedFunctionService = inject(FinanceService);
  expensesList: any[] = [];
  nextUrl: string | null = null;
  currentMonth: string = '';
  isLoading = false;
  selectedDate: any;  // Speichert das gewählte Datum

  calendarVisible: boolean = false;

  constructor() {
    this.getAllExpenses();
  }

  ngAfterViewInit() {
    this.setupScrollListener();
  }


  /**
  * Fetches all expenses using the FinanceService and initializes the month display.
  */
  getAllExpenses() {
    this.sharedFunctionService.getLazyLoadingExpenses().subscribe((response: any) => {
      this.expensesList = response.results;
      this.nextUrl = response.next;
      console.log(this.expensesList);
      this.setCurrentMonthOnInit()
    });
  }


  /**
 * Sets the current month based on the first expense in the list.
 */
  setCurrentMonthOnInit() {
    let currentDate = this.expensesList[0].date
    let currentMonth = this.extractMonthFromDate(currentDate)
    this.currentMonth = currentMonth
  }


  /**
  * Loads more expenses if available and not already loading.
  */
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


  /**
 * Sets up a scroll event listener to trigger lazy loading and month changes.
 */
  setupScrollListener() {
    const listContainer = document.querySelector('.list') as HTMLElement;
    listContainer.addEventListener('scroll', this.onScroll.bind(this));
    this.onScroll();
  }



  /**
 * Handles the scroll event to determine if more expenses should be loaded
 * or if the displayed month should change.
 */
  onScroll() {
    if (this.isLoading) return;
    if (this.hasScrolledToBottom()) {
      if (this.nextUrl) {
        this.loadMoreExpenses();
      }
    }
    this.checkMonthChange();
  }


  /**
 * Checks if the user has scrolled to the bottom of the list.
 * @returns {boolean} - True if near the bottom, false otherwise.
 */
  hasScrolledToBottom(): boolean {
    const listContainer = document.querySelector('.list') as HTMLElement;
    return listContainer.scrollTop + listContainer.clientHeight >= listContainer.scrollHeight - 50;
  }


  /**
 * Iterates through expense elements to check if the displayed month should change.
 */
  checkMonthChange() {
    const expenseElements = document.querySelectorAll('.overview-information-container');
    const listContainer = document.querySelector('.list') as HTMLElement;

    for (let i = 0; i < expenseElements.length; i++) {
      const expenseElement = expenseElements[i] as HTMLElement;

      const rect = expenseElement.getBoundingClientRect();
      const offsetTop = this.calculateOffsetTop(rect, listContainer);
      const elementHeight = rect.height;

      this.triggerMonthChangeOnVisibility(offsetTop, elementHeight, expenseElement);
    }
  }


   /**
   * Calculates the vertical offset of an element relative to the list container.
   * @param {DOMRect} rect - The bounding rectangle of the expense element.
   * @param {HTMLElement} listContainer - The scrolling container.
   * @returns {number} - The computed offset.
   */
  calculateOffsetTop(rect: DOMRect, listContainer: HTMLElement): number {
    return rect.top - listContainer.getBoundingClientRect().top;
  }


    /**
   * Determines if an expense is in view and updates the displayed month accordingly.
   * @param {number} offsetTop - The vertical offset of the expense element.
   * @param {number} elementHeight - The height of the expense element.
   * @param {HTMLElement} expenseElement - The expense element.
   */
  triggerMonthChangeOnVisibility(offsetTop: number, elementHeight: number, expenseElement: HTMLElement) {
    if (offsetTop <= 0 && offsetTop >= -elementHeight) {
      const expenseId = expenseElement.getAttribute('data-expense-id');
      const expense = this.expensesList.find((e: any) => e.id == expenseId);
      this.changeCurrentMonthName(expense);
    }
  }


  /**
   * Updates the displayed month name based on the given expense.
   * @param {any} expense - The expense whose date determines the month.
   */
  changeCurrentMonthName(expense: any) {
    if (expense) {
      const monthName = this.extractMonthFromDate(expense.date);

      if (this.currentMonth !== monthName) {
        this.currentMonth = monthName;
        console.log('Aktueller Monat:', this.currentMonth);
      }
    }
  }


    /**
   * Extracts the month name from a given date string.
   * @param {string} date - The date string.
   * @returns {string} - The month name in German.
   */
  extractMonthFromDate(date: string): string {
    const monthNames = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    const month = new Date(date).getMonth();
    return monthNames[month];
  }


  toggleCalendar() {
    this.calendarVisible = !this.calendarVisible;  // Kalender bei Klick einblenden
     console.log(this.selectedDate);
    
  }

}
