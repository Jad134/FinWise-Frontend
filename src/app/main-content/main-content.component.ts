import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardBackgroundComponent } from "../shared/dashboard-background/dashboard-background.component";

@Component({
    selector: 'app-main-content',
    standalone: true,
    templateUrl: './main-content.component.html',
    styleUrl: './main-content.component.scss',
    imports: [RouterModule, DashboardBackgroundComponent]
})
export class MainContentComponent {

}
