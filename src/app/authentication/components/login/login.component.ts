import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/services/auth.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { PasswordModule } from 'primeng/password';  // Import PasswordModule for p-password

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule, 
    CardModule,
    InputTextModule,
    FormsModule,  // Add FormsModule to support ngModel
    PasswordModule,  // Add PasswordModule to use p-password
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onLogin() {
    const { email, password } = this.login;

    this.authService.getUserDetails(email, password).subscribe({
      next: (response) => {
        if (response.length >= 1) {
          const user = response[0];
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('role', user.role);

          if (user.role === 'Service Provider') {
            this.router.navigate(['service-provider']);
          } else if (user.role === 'Customer') {
            this.router.navigate(['home']);
          } else if (user.role === 'Admin') {
            this.router.navigate(['admin']);
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Unknown Role',
              detail: 'User role is not recognized',
            });
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid email or password',
          });
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      },
    });
  }
}
