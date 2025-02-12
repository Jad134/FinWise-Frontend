import { Component, inject } from '@angular/core';
import { MainBackgroundComponent } from "../../shared/main-background/main-background.component";
import { FormsModule } from '@angular/forms';
import { ApiUrlsService } from '../../services/api-urls.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  imports: [MainBackgroundComponent, FormsModule, CommonModule]
})
export class SignUpComponent {

  constructor(private http: HttpClient, private router: Router) { }

  passwordVisible = false;
  confirmedPasswordVisisble = false;
  apiService = inject(ApiUrlsService)
  errors: Record<string, boolean> = {};


  user = {
    username: '',
    email: '',
    mobile_number: '',
    date_of_birth: '',
    password: '',
    confirm_password: ''
  };


  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }


  toggleConfirmedPasswordVisibiliy(): void {
    this.confirmedPasswordVisisble = !this.confirmedPasswordVisisble;
  }


  registerUser() {
    this.http.post(this.apiService.REGISTER_URL, this.user).subscribe({
      next: (response) => {
        console.log('✅ Registrierung erfolgreich:', response);
        alert('Registrierung erfolgreich!');
        this.router.navigate(['/login']);
      },
      error: ({ error }) => {
        console.error('❌ Registrierungsfehler:', error);

        if (error) {
          console.log('❌ Fehlermeldungen vom Server:', error);
          this.errors = {};

        Object.keys(error).forEach((key) => {
          console.log(key); 
          this.errors[key] = true; 

        });
        }
        else console.log('❌ Unbekannter Fehler aufgetreten.');
      }
    });
  }


  formatDate() {
    let value = this.user.date_of_birth.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5);
    }
  
    this.user.date_of_birth = value.substring(0, 10); 
  }

}


