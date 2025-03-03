import { Component } from '@angular/core';

@Component({
  selector: 'app-home-white',
  standalone: true,
  imports: [],
  templateUrl: './home-white.component.html',
  styleUrls: ['./home-white.component.scss', './process-circle.scss'] 

})
export class HomeWhiteComponent {

  progressPercentage: number = 50; 
  circumference: number = 2 * Math.PI * 45; 

  get progressOffset(): number {
    return this.circumference * (1 - this.progressPercentage / 100);
  }
}
