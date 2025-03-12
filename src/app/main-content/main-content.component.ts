import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DashboardBackgroundComponent } from "../shared/dashboard-background/dashboard-background.component";

@Component({
    selector: 'app-main-content',
    standalone: true,
    templateUrl: './main-content.component.html',
    styleUrl: './main-content.component.scss',
    imports: [RouterModule, DashboardBackgroundComponent]
})
export class MainContentComponent {
constructor(private router: Router){   
    this.checkIfUserIsLoggedIn()
}

/**
 * Checks the token from sessioStorage
 */
checkIfUserIsLoggedIn(){
    if (sessionStorage['token']){
    }
    else{
        this.router.navigate(['']);
    }
}
}
