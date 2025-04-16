import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public userLoginInfo: { email: string; password: string } = {
    email: '',
    password: ''
  };

  private router = inject(Router);
  private authService = inject(AuthService);

  // Asynchronous method: Handles login process and waits for it to complete
  public async onLogin(): Promise<void> {
    if (!this.validateLoginForm()) {
      return;
    }

    try {
      const {data, error} = await this.authService.signIn(
        this.userLoginInfo.email,
        this.userLoginInfo.password
      );

      if(error) {
        alert(`Login failed: ${error.message}`);
      } else {
        alert('Login Success');
        await this.router.navigateByUrl('/home');
      }
    } catch (error: any) {
      alert('Login failed');
    }
  }

  // Synchronous method: Validates the login form
  private validateLoginForm(): boolean {
    if(!this.userLoginInfo.email) {
      alert('Email is required');
      return false;
    }
    if(!this.userLoginInfo.password) {
      alert('Password is required');
      return false;
    }
    return true;
  }
}
