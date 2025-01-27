import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { HomeComponent } from './main-content/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: MainContentComponent,
        children:[
            { path: 'home', component: HomeComponent },
        ]
    },
    {path: '',component: LandingPageComponent},
    {path: 'login',component: LoginComponent},
    {path: 'sign-up',component: SignUpComponent}
];
