import { Component } from '@angular/core';

@Component({
  selector: 'app-home-green',
  standalone: true,
  imports: [],
  templateUrl: './home-green.component.html',
  styleUrl: './home-green.component.scss'
})
export class HomeGreenComponent {
  
  constructor() {
    this.setGreeting()
  }

  greeting: string = "";
  totalBalance:number | undefined;

  setGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
      this.greeting = 'Morning';
    } else if (hour < 18) {
      this.greeting = 'Afternoon';
    } else {
      this.greeting = 'Evening';
    }
  }

}
