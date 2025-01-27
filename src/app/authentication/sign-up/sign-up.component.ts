import { Component } from '@angular/core';
import { MainBackgroundComponent } from "../../shared/main-background/main-background.component";

@Component({
    selector: 'app-sign-up',
    standalone: true,
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
    imports: [MainBackgroundComponent]
})
export class SignUpComponent {
  passwordVisible = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
