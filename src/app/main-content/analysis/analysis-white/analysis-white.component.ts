import { Component, inject } from '@angular/core';
import { BarChartComponent } from "../../../shared/components/bar-chart/bar-chart.component";
import { FinanceService } from '../../../services/shared-functions.service';
import { ApiUrlsService } from '../../../services/api-urls.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-analysis-white',
    standalone: true,
    templateUrl: './analysis-white.component.html',
    styleUrl: './analysis-white.component.scss',
    imports: [BarChartComponent, CommonModule]
})
export class AnalysisWhiteComponent {

    constructor() {
        this.fetchData('daily')
        this.loadMonthlyIncome();
    }


    circumference = 2 * Math.PI * 45; 
    apiService = inject(ApiUrlsService)
    sharedFunctions = inject(FinanceService)
    selectedPeriod: string = 'daily';
    totalIncome: number = 0;
    totalExpenses: number = 0;
    monthlyIncome: number = 1;
    topCategories: { category: string, total_amount: number, percentage: number }[] = [];


    /**
     * Fetches the income and expense amounts based on the selected time period.
     * @param period The selected time period (e.g., 'daily', 'weekly', 'monthly', 'yearly')
     */
    fetchData(period: string) {
        this.selectedPeriod = period;
        this.getIncome(period)
        this.getExpense(period)
    }



    /**
    * Retrieves the total income for a given time period.
    * @param period The selected time period
    */
    getIncome(period: any) {
        this.sharedFunctions.getIncome(period).subscribe(data => {
            this.totalIncome = data.reduce((sum: number, income: any) => sum + parseFloat(income.amount), 0);
        });
    }



    /**
    * Retrieves the total expenses for a given time period.
    * @param period The selected time period
    */
    getExpense(period: any) {
        this.sharedFunctions.getExpenses(period).subscribe(data => {
            this.totalExpenses = data.reduce((sum: number, expense: any) => sum + parseFloat(expense.amount), 0);
        });
    }


    /**
    * Retrieves and sets the total income for the current month.
    * This is necessary for calculating percentage values for expense categories.
    */
    loadMonthlyIncome() {
        this.sharedFunctions.getIncome("monthly").subscribe(data => {
            this.monthlyIncome = data.reduce((sum: number, income: any) => sum + parseFloat(income.amount), 0) || 1;
            console.log("Monthly Income loaded:", this.monthlyIncome);

            this.getTopCategories();
        });
    }


    /**
     * Fetches the top 2 expense categories for the current month.
     * The percentage is calculated relative to the monthly income.
     */
    getTopCategories() {
        this.sharedFunctions.getTopCategories().subscribe(categories => {
            this.topCategories = categories.map((category: { category: any; total_amount: number; }) => ({
                category: category.category,
                amount: category.total_amount,
                percentage: Math.round((category.total_amount / this.monthlyIncome) * 100)
            }));
            console.log("Top Categories:", this.topCategories, this.monthlyIncome);
        });
    }


    /**
    * Calculates the stroke-dashoffset for the SVG progress circle.
    * This value determines how much of the circle is filled based on the given percentage.
    * @param percentage The percentage value (0 - 100)
    * @returns The calculated stroke-dashoffset value
    */
    getProgressOffset(percentage: number): number {
        return this.circumference * (1 - percentage / 100);
    }
}
