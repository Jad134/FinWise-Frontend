import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef;

  constructor() {
    // Registriere alle notwendigen Komponenten von Chart.js
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar', // Balkendiagramm
      data: {
        labels: ['Januar', 'Februar', 'März', 'April'],
        datasets: [
          {
            label: 'Einnahmen',
            data: [500, 700, 400, 900], // Beispielwerte
            backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#FF5722'],
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  }
}


