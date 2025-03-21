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

  getAllExpenses(){
    this.sharedFunctionService.getAllExpenses().subscribe(expenses => {
      this.expensesList = expenses as any;
      console.log(`all expenses`, expenses);
    });
  }
}
