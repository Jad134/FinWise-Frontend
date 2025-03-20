import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FinanceService } from '../../../services/shared-functions.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transaction-green',
  standalone: true,
  imports: [],
  templateUrl: './transaction-green.component.html',
  styleUrl: './transaction-green.component.scss'
})
export class TransactionGreenComponent {

  constructor(private router: Router) {
    this.getTotalBalance()
  }

  totalBalance: number = 0;
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
}
