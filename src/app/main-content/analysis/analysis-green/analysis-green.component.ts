import { Component, inject } from '@angular/core';
import { FinanceService } from '../../../services/shared-functions.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis-green',
  standalone: true,
  imports: [],
  templateUrl: './analysis-green.component.html',
  styleUrl: './analysis-green.component.scss'
})
export class AnalysisGreenComponent {

  constructor(private router: Router) {
    this.getTotalBalance()
    this.getTotalExpenses()
    this.getTargetSavings()
  }

  currentRoute: string = ''
  sharedFunctionService = inject(FinanceService)

  greeting: string = "";
  totalBalance: number = 0;
  totalExpenses: number | undefined;
  targetSavings: number = 1;
  targetText: string = 'Looks goodsnsns'

  private totalBalance$ = new BehaviorSubject<number | undefined>(undefined);
  private targetSavings$ = new BehaviorSubject<number | undefined>(undefined);
  progressPercentage: number = 100;


  getTotalBalance() {
    this.sharedFunctionService.getTotalBalance().subscribe(balance => {
      this.totalBalance = balance;
      this.totalBalance$.next(balance);
      this.calculateProgressPercentage();
    });
  }


  getTotalExpenses() {
    this.sharedFunctionService.getTotalExpenses().subscribe(expense => {
      this.totalExpenses = expense;
      console.log(this.totalExpenses);

    });
  }


  getTargetSavings() {
    this.sharedFunctionService.getTargetSavings().subscribe(target => {
      this.targetSavings = target;
      console.log(this.targetSavings);
      this.targetSavings$.next(target);
      this.calculateProgressPercentage();
    });
  }


  calculateProgressPercentage() {
    const balance = this.totalBalance$.getValue();
    const target = this.targetSavings$.getValue();

    if (balance !== undefined && target !== undefined && target !== 0) {
      const progress = (balance / target) * 100;
      this.progressPercentage = Math.min(progress, 100);
      this.progressPercentage = Math.round(this.progressPercentage)
      console.log("📊 Neuer erreichterr Prozentwert:", this.progressPercentage);
      this.changeProgressText()
    }
  }


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


  routeToHome() {
    this.router.navigate(['dashboard/home'])
  }
}



