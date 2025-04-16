import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public userRegistrationInfo: { username: string; email: string; password: string} = {
    username: '',
    email: '',
    password: ''
  };

  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);

  // Asynchronous method: Handles registration process and waits for it to complete
  public async onRegister(): Promise<void> {
    if(!this.validateRegistrationForm()){
      return;
    }
    try {
      const {data, error} = await this.authService.signUp(
        this.userRegistrationInfo.username,
        this.userRegistrationInfo.email,
        this.userRegistrationInfo.password
      );
      if (error) {
        alert(`Registration failed: ${error.message}`);
      } else {
        alert('Registration Success');
        await this.router.navigateByUrl('/login');
      }
    } catch (error: any){
      alert('Registration failed');
    }
  }

  // Synchronous method: Validates the registration form
  private validateRegistrationForm(): boolean {
    if(!this.userRegistrationInfo.username) {
      alert("Username is required");
      return false;
    }
    if(!(this.userRegistrationInfo.username.length >= 3 && this.userRegistrationInfo.username.length <= 20)) {
      alert("Username must be between 3 and 20 characters");
      return false;
    }
    if(!this.userRegistrationInfo.email) {
      alert("Email is required");
      return false;
    }
    if(!this.userRegistrationInfo.password) {
      alert("Password is required");
      return false;
    }
    return true;
  }


}
