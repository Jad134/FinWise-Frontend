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
            data: [3000, 1000, 7000, 500, 17000, 2000, 2500],
            backgroundColor: '#1ABC9C',
            borderRadius: 5,
            categoryPercentage: 0.4,
            barPercentage: 0.5,
          },
          {
            label: 'Expenses',
            data: [6000, 4000, 3000, 5000, 9000, 500, 6000],
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
            min: 0,
            max: 16000, 
            ticks: {
              color: '#90CAF9',
              callback: (value: number) => `${value / 1000}k`
            },
            afterBuildTicks: (axis) => {
              // Nur die gewünschten Werte behalten
              axis.ticks = [1000, 5000, 10000, 15000].map(v => ({ value: v }));
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
