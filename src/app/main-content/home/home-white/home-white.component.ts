import { Component } from '@angular/core';

@Component({
  selector: 'app-home-white',
  standalone: true,
  imports: [],
  templateUrl: './home-white.component.html',
  styleUrl: './home-white.component.scss'
})
export class HomeWhiteComponent {

  progressPercentage: number = 75; // Beispielwert
  circumference: number = 2 * Math.PI * 45; // Kreisumfang für r=45

  get progressOffset(): number {
    return this.circumference * (1 - this.progressPercentage / 100);
  }
}
