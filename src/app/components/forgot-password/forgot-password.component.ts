import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  public email: string = '';
  private authService = inject(AuthService);

  // Asynchronous method: Handles the password reset request
  public async onSubmit(): Promise<void> {
    if (!this.validateEmail()) {
      return;
    }
    try {
      const { error } = await this.authService.sendResetLink(this.email);
      if (error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Password reset email sent.');
      }
    } catch (error: any) {
      alert('An unexpected error occurred.');
    }
  }

  // Synchronous method: Validates the email address
  private validateEmail(): boolean {
    if (!this.email) {
      alert('Email is required');
      return false;
    }
    return true;
  }

}
