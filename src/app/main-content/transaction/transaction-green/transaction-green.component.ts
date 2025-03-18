import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-transaction-green',
  standalone: true,
  imports: [],
  templateUrl: './transaction-green.component.html',
  styleUrl: './transaction-green.component.scss'
})
export class TransactionGreenComponent {

  constructor(private router: Router) {
  }


  routeToHome() {
    this.router.navigate(['dashboard/home'])
  }
}
