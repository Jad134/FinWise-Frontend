import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainBackgroundComponent } from "../../shared/main-background/main-background.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [RouterModule, MainBackgroundComponent]
})
export class LoginComponent {
  passwordVisible = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
