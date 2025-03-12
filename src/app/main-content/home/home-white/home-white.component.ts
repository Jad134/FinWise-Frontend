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


  /**
   * Calculates the offset for the progress circle based on the current progress percentage.
   * This is used to determine how much of the circular progress bar should be filled.
   * 
   * @returns {number} The calculated offset value for the progress circle.
   */
  get progressOffset(): number {
    return this.circumference * (1 - this.progressPercentage / 100);
  }


   /**
   * Fetches expenses based on the selected filter and updates the expenses list.
   * The filter can be a category like 'food', 'transport', etc.
   * 
   * @param {string} filter - The category filter to fetch specific expenses.
   */
  getFilteredExpenses(filter: string) {
    this.selectedFilter = filter;
    this.sharedFunctionService.getFilteredExpenses(filter).subscribe(expenses => {
      this.expensesList = expenses;
      console.log(`Filtered Expenses (${filter}):`, expenses);
    });
  }
}
