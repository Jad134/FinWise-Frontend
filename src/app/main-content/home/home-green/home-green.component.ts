import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FinanceService } from '../../../services/shared-functions.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home-green',
  standalone: true,
  imports: [],
  templateUrl: './home-green.component.html',
  styleUrl: './home-green.component.scss',
})
export class HomeGreenComponent {

  constructor() {
    this.setGreeting()
    this.getTotalBalance()
    this.getTotalExpenses()
    this.getTargetSavings()
  }

  sharedFunctionService = inject(FinanceService)

  greeting: string = "";
  totalBalance: number = 0;
  totalExpenses: number | undefined;
  targetSavings: number = 1;
  targetText: string = 'Looks goodsnsns'
  progressPercentage: number = 100;

  private totalBalance$ = new BehaviorSubject<number | undefined>(undefined);
  private targetSavings$ = new BehaviorSubject<number | undefined>(undefined);




  /**
   * Sets greetings depending on the time of day for Header
   */
  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Morning';
    } else if (hour < 18) {
      this.greeting = 'Afternoon';
    } else {
      this.greeting = 'Evening';
    }
  }


  /**
   * Get the amount of the Total Balance
   */
  getTotalBalance() {
    this.sharedFunctionService.getTotalBalance().subscribe(balance => {
      this.totalBalance = balance;
      this.totalBalance$.next(balance);
      this.calculateProgressPercentage();
    });
  }


  /**
   * Get the amount of the Total expense
   */
  getTotalExpenses() {
    this.sharedFunctionService.getTotalExpenses().subscribe(expense => {
      this.totalExpenses = expense;
    });
  }


  /**
   * Get the amount of the users targent
   */
  getTargetSavings() {
    this.sharedFunctionService.getTargetSavings().subscribe(target => {
      this.targetSavings = target;
      this.targetSavings$.next(target);
      this.calculateProgressPercentage();
    });
  }


/**
 * Calculate the percantage of the targent progress for the progressbar with live rxjs Subject
 */
  calculateProgressPercentage() {
    const balance = this.totalBalance$.getValue();
    const target = this.targetSavings$.getValue();

    if (balance !== undefined && target !== undefined && target !== 0) {
      const progress = (balance / target) * 100;
      this.progressPercentage = Math.min(progress, 100);
      this.progressPercentage = Math.round(this.progressPercentage)
      this.changeProgressText()
    }
  }


  /**
   * Changes the target text below the percentage bar depending on the percentage
   */
  changeProgressText() {
    switch (true) {
      case this.progressPercentage <= 29:
        this.targetText = 'Let\'s Go.';
        break;
      case this.progressPercentage <= 49:
        this.targetText = 'Looks Good.';
        break;
      case this.progressPercentage <= 69:
        this.targetText = 'It\'s Halftime.';
        break;
      case this.progressPercentage <= 89:
        this.targetText = 'Almost There!';
        break;
      default:
        this.targetText = 'So Close!';
        break;
    }
  }
}


