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
    this.sharedFunctionService.getAllExpenses().subscribe((expenses: any) => {
      this.expensesList = (expenses as any[]).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      console.log(`all expenses`, this.expensesList);
    });
  }
}
