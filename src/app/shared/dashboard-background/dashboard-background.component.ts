import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-background',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-background.component.html',
  styleUrl: './dashboard-background.component.scss'
})
export class DashboardBackgroundComponent {

  currentRoute: string = ''


  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
}
