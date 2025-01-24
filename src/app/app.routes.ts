import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { HomeComponent } from './main-content/home/home.component';
import { LoginComponent } from './authentication/login/login.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: MainContentComponent,
        children:[
            { path: 'home', component: HomeComponent },
        ]
    },
];
