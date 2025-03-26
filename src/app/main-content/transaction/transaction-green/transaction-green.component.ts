import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FinanceService } from '../../../services/shared-functions.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transaction-green',
  standalone: true,
  imports: [],
  templateUrl: './transaction-green.component.html',
  styleUrl: './transaction-green.component.scss',

})
export class TransactionGreenComponent {

  constructor(private router: Router) {
    this.getTotalBalance();
    this.getIncome();
    this.getExpense();
  }

  totalBalance: number = 0;
  totalIncome: number = 0;
  totalExpenses: number = 0;
  sharedFunctionService = inject(FinanceService)

  private totalBalance$ = new BehaviorSubject<number | undefined>(undefined);

  routeToHome() {
    this.router.navigate(['dashboard/home'])
  }


  /**
   * Get the amount of the Total Balance
   */
  getTotalBalance() {
    this.sharedFunctionService.getTotalBalance().subscribe(balance => {
      this.totalBalance = balance;
      this.totalBalance$.next(balance);
    });
  }

  getIncome() {
    this.sharedFunctionService.getIncome('monthly').subscribe(data => {
      this.totalIncome = data.reduce((sum: number, income: any) => sum + parseFloat(income.amount), 0);
    });
  }



  /**
  * Retrieves the total expenses for a given time period.
  * @param period The selected time period
  */
  getExpense() {
    this.sharedFunctionService.getExpenses('monthly').subscribe(data => {
      this.totalExpenses = data.reduce((sum: number, expense: any) => sum + parseFloat(expense.amount), 0);
    });
  }
}
