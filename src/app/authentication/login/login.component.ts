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
  user = {
    username: '',
    password: '',
  }


  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }


  login() {
    this.http.post(this.apiService.LOGIN_URL, this.user).subscribe({
      next: (response) => {
        console.log('✅ Login erfolgreich:', response);
        alert('Login erfolgreich!');
        this.router.navigate(['/dashboard']);
      },
      error: ({ error }) => {
        console.error('❌ LogInfehler:', error);
        if(error){
          this.usernameInvalid = true;
          this.passwordInvalid = true;
        }
      }
    })
  }
}
