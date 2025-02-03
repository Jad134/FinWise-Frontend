import { Component, inject } from '@angular/core';
import { MainBackgroundComponent } from "../../shared/main-background/main-background.component";
import { FormsModule } from '@angular/forms';
import { ApiUrlsService } from '../../services/api-urls.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  imports: [MainBackgroundComponent, FormsModule,]
})
export class SignUpComponent {


  
  passwordVisible = false;
  confirmedPasswordVisisble = false;
  apiService = inject(ApiUrlsService)
  constructor(private http: HttpClient, private router: Router) {}
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
        console.log('Registrierung erfolgreich:', response);
        alert('Registrierung erfolgreich!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registrierungsfehler:', error);
        alert('Fehler bei der Registrierung');
      }
    });
  }
}


