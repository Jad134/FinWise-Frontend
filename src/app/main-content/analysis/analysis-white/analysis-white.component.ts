import { Component, inject } from '@angular/core';
import { BarChartComponent } from "../../../shared/components/bar-chart/bar-chart.component";
import { FinanceService } from '../../../services/shared-functions.service';
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
    }


    sharedFunctions = inject(FinanceService)
    selectedPeriod: string = 'daily';
    totalIncome: number = 0;
    totalExpenses: number = 0;


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
}
