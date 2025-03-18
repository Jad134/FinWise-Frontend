import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { LoginComponent } from './authentication/login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { HomeGreenComponent } from './main-content/home/home-green/home-green.component';
import { HomeWhiteComponent } from './main-content/home/home-white/home-white.component';
import { AnalysisGreenComponent } from './main-content/analysis/analysis-green/analysis-green.component';
import { AnalysisWhiteComponent } from './main-content/analysis/analysis-white/analysis-white.component';
import { TransactionGreenComponent } from './main-content/transaction/transaction-green/transaction-green.component';
import { TransactionWhiteComponent } from './main-content/transaction/transaction-white/transaction-white.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: MainContentComponent,
        children: [
            {
                path: 'home',
                children: [
                    { path: '', component: HomeGreenComponent, outlet: 'green' },
                    { path: '', component: HomeWhiteComponent, outlet: 'white' }
                ]
            },
            {
                path: 'analysis',
                children: [
                  { path: '', component: AnalysisGreenComponent, outlet: 'green' },
                  { path: '', component: AnalysisWhiteComponent, outlet: 'white' }
                ]
              },
              {
                path: 'transaction',
                children: [
                  { path: '', component: TransactionGreenComponent, outlet: 'green' },
                  { path: '', component: TransactionWhiteComponent, outlet: 'white' }
                ]
              }
        ]

    },
    { path: '', component: LandingPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent }
];
