import { Component } from '@angular/core';
import { BarChartComponent } from "../../../shared/components/bar-chart/bar-chart.component";

@Component({
    selector: 'app-analysis-white',
    standalone: true,
    templateUrl: './analysis-white.component.html',
    styleUrl: './analysis-white.component.scss',
    imports: [BarChartComponent]
})
export class AnalysisWhiteComponent {

}
