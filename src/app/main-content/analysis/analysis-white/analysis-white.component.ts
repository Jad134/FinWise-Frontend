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
        this.getTopCategories()
    }

    apiService = inject(ApiUrlsService)
    sharedFunctions = inject(FinanceService)
    selectedPeriod: string = 'daily';
    totalIncome: number = 0;
    totalExpenses: number = 0;
    monthlyIncome: number = 1;
    topCategories: { category: string, total_amount: number, percantage:number }[] = [];



    fetchData(period: string) {
        this.selectedPeriod = period;
        this.getIncome(period)
        this.getExpense(period)
    }


    getIncome(period: any) {
        this.sharedFunctions.getIncome(period).subscribe(data => {
            this.totalIncome = data.reduce((sum: number, income: any) => sum + parseFloat(income.amount), 0);
        });
    }


    getExpense(period: any) {
        this.sharedFunctions.getExpenses(period).subscribe(data => {
            this.totalExpenses = data.reduce((sum: number, expense: any) => sum + parseFloat(expense.amount), 0);
        });
    }

    loadMonthlyIncome() {
        this.sharedFunctions.getIncome("monthly").subscribe(data => {
            this.monthlyIncome = data.reduce((sum: number, income: any) => sum + parseFloat(income.amount), 0) || 1;
            console.log(this.monthlyIncome);

        });
    }

    getTopCategories() {
        this.sharedFunctions.getTopCategories().subscribe(categories => {
            this.topCategories = categories.map((category: { category: any; total_amount: number; }) => ({
                category: category.category,
                amount: category.total_amount,
                percentage: (category.total_amount / this.monthlyIncome) * 100
            }));
            console.log("Top Categories:", this.topCategories);
        });
    }


}
