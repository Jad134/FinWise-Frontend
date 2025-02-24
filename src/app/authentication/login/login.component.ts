import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MainBackgroundComponent } from "../../shared/main-background/main-background.component";
import { FormsModule } from '@angular/forms';
import { ApiUrlsService } from '../../services/api-urls.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [RouterModule, MainBackgroundComponent, FormsModule, CommonModule]
})
export class LoginComponent {

  constructor(private http: HttpClient, private router: Router) { }
  apiService = inject(ApiUrlsService)
  passwordVisible = false;
  usernameInvalid = false;
  passwordInvalid = false;
  showNotification = false;
  user = {
    username: '',
    password: '',
  }


  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }


  login() {
    this.http.post(this.apiService.LOGIN_URL, this.user).subscribe({
      next: (response:any) => {
        console.log('✅ Login erfolgreich:', response);
        alert('Login erfolgreich!');
        sessionStorage.setItem('token', response.token);
        console.log(sessionStorage['token']);
        
        this.router.navigate(['/dashboard/home']);
      },
      error: ({ error }) => {
        console.error('❌ LogInfehler:', error);
        if (error) {
          this.validationControl()

        }
      }
    })
  }


  validationControl() {
    this.usernameInvalid = true;
    this.passwordInvalid = true;
    if (!this.showNotification) {
      this.showNotification = true;

      setTimeout(() => {
        this.showNotification = false;
      }, 6000);
    }
  }
}
