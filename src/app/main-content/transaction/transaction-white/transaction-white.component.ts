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
  constructor() {
    this.getAllExpenses();
  }

  sharedFunctionService = inject(FinanceService);
  expensesList: any[] = [];
  nextUrl: string | null = null;
  currentMonth: string = '';
  observer: IntersectionObserver | null = null;
  isLoading = false; // Zustand für laufende Requests

  ngAfterViewInit() {
    this.setupObserver();
  }

  getAllExpenses() {
    this.sharedFunctionService.getLazyLoadingExpenses().subscribe((response: any) => {
      this.expensesList = response.results;
      this.nextUrl = response.next;
      setTimeout(() => this.setupObserver(), 100); // Sicherstellen, dass der Observer sich neu registriert
    });
  }

  onScroll() {
    if (this.isLoading) return; // Verhindere Mehrfach-Requests während des Ladens

    const element = document.querySelector('.list') as HTMLElement;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 50) {
      if (this.nextUrl) {
        this.loadMoreExpenses();
      }
    }
  }

  loadMoreExpenses() {
    if (!this.nextUrl || this.isLoading) return;

    this.isLoading = true;
    this.sharedFunctionService.getLazyLoadingExpenses(this.nextUrl).subscribe((response: any) => {
      this.expensesList = [...this.expensesList, ...response.results];
      this.nextUrl = response.next;
      this.isLoading = false;

      setTimeout(() => this.setupObserver(), 100); // Sicherstellen, dass neue Elemente beobachtet werden
    });
  }

  setupObserver() {
    if (this.observer) {
      this.observer.disconnect(); // Alten Observer entfernen
    }

    // Erstelle einen neuen Observer
    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          // Wenn die Ausgabe den oberen Bereich erreicht, wechseln wir den Monat
          const expenseId = entry.target.getAttribute('data-expense-id');
          const expense = this.expensesList.find((e: any) => e.id == expenseId);

          if (expense) {
            const monthName = this.getMonthName(expense.date);

            // Monat wechseln, wenn der Monat nicht bereits angezeigt wird
            if (this.currentMonth !== monthName) {
              this.currentMonth = monthName;
              console.log('Aktueller Monat:', this.currentMonth);
            }
          }
        }
      }
    }, { root: document.querySelector('.list'), threshold: 1.0});

    // Beobachte alle Ausgaben
    const expenseElements = document.querySelectorAll('.overview-information-container');
    expenseElements.forEach(el => this.observer?.observe(el));
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
