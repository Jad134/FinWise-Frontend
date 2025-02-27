import { Component, inject } from '@angular/core';
import {FinanceService} from '../../../services/shared-functions.service'

@Component({
  selector: 'app-home-green',
  standalone: true,
  imports: [],
  templateUrl: './home-green.component.html',
  styleUrl: './home-green.component.scss'
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
  totalBalance:number | undefined ;
  totalExpenses:number | undefined;
  targetSavings:number | undefined;

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

  getTotalBalance(){
    this.sharedFunctionService.getTotalBalance().subscribe(balance => {
      this.totalBalance = balance;
    });
  }

  getTotalExpenses(){
    this.sharedFunctionService.getTotalExpenses().subscribe(expense => {
      this.totalExpenses = expense;
      console.log(this.totalExpenses);
      
    });
  }

  getTargetSavings(){
    this.sharedFunctionService.getTargetSavings().subscribe(target => {
      this.targetSavings = target;
      console.log(this.targetSavings);
    });
  }

}
