import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartOptions, registerables } from 'chart.js';

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
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Income',
            data: [1, 5, 10, 15],
            backgroundColor: '#1ABC9C',
            borderRadius: 5,
            categoryPercentage: 0.4, 
            barPercentage: 0.5, 
          },
          {
            label: 'Expenses',
            data: [1, 5, 10, 15],
            backgroundColor: '#007AFF',
            borderRadius: 5,
            categoryPercentage: 0.4, 
            barPercentage: 0.5, 
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              drawOnChartArea: false,
            }
          },
          y: {
            grid: {
              borderDash: [5, 5],
              color: '#90CAF9',
            },
            ticks: {
              color: '#90CAF9',
              callback: (value) => value + 'k',
            }
          }
        },
        plugins: {
          legend: { display: false }
        }
      } as ChartOptions
    });
  }
}
