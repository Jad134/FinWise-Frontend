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
  constructor(){
    this.getAllExpenses()
  }

  sharedFunctionService = inject(FinanceService)
  expensesList: any[] = [];


  getAllExpenses() {
    this.sharedFunctionService.getLazyLoadingExpenses().subscribe((response: any) => {
      // Extrahiere die 'results' aus der Antwort und speichere sie in der List
      this.expensesList = response.results;  // 'results' enthält die eigentlichen Ausgaben
      console.log('All expenses:', this.expensesList);
    });
  }
}
