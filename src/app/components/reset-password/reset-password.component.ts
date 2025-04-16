import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  public newPassword: string = '';
  public confirmPassword: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  // Asynchronous method: Handles the password reset process
  public async onResetPassword(): Promise<void> {
    if (!this.validatePasswords()) {
      return;
    }

    try {
      const { error } = await this.authService.resetPassword(this.newPassword);
      if (error) {
        alert(`Password reset failed: ${error.message}`);
      } else {
        alert('Password reset successful!');
        await this.router.navigate(['/login']);
      }
    } catch (error: any) {
      alert('An unexpected error occurred.');
    }
  }

  // Synchronous method: Validates the new password and cofirm password fields
  private validatePasswords(): boolean {
    if (!this.newPassword) {
      alert('New password is required');
      return false;
    }
    if (!this.confirmPassword) {
      alert('Confirm password is required');
      return false;
    }
    if (this.newPassword !== this.confirmPassword) {
      alert('Password do not match');
      return false;
    }

    return true;
  }

}
