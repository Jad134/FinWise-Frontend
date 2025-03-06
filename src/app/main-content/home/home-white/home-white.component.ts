import { Component, inject } from '@angular/core';
import { FinanceService } from '../../../services/shared-functions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-white',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-white.component.html',
  styleUrls: ['./home-white.component.scss', './process-circle.scss']

})
export class HomeWhiteComponent {


  constructor() {
    this.getFilteredExpenses('food');
  }


  sharedFunctionService = inject(FinanceService)
  expensesList: any[] = [];
  progressPercentage: number = 50;
  circumference: number = 2 * Math.PI * 45;
  selectedFilter: string = 'food';

  get progressOffset(): number {
    return this.circumference * (1 - this.progressPercentage / 100);
  }


  getFilteredExpenses(filter: string) {
    this.selectedFilter = filter;
    this.sharedFunctionService.getFilteredExpenses(filter).subscribe(expenses => {
      this.expensesList = expenses;
      console.log(`Filtered Expenses (${filter}):`, expenses);
    });
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}
