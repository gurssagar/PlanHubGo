import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton'; // Import RadioButtonModule
import { passwordMismatchValidator } from '../../services/shared/password-mismatch.directive';
import { AuthService } from '../../services/services/auth.service';
import { RegisterPostData } from '../../models/interfaces/auth';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
    RadioButtonModule,
    CommonModule, // Include RadioButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private registerService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  registerForm = new FormGroup(
    {
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-z0-9\._%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$/),
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(18),
        Validators.max(100),
      ]),
      role: new FormControl('', [Validators.required]), // New Role Field
    },
    {
      validators: passwordMismatchValidator,
    }
  );

  onRegister() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
  
    // Check if the email is already registered
    const email = postData.email!; // Use non-null assertion
    this.registerService.isEmailUnique(email).subscribe({
      next: (isUnique) => {
        if (!isUnique) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Email is already registered!',
          });
        } else {
          this.registerService.registerUser(postData as RegisterPostData).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Registered successfully',
              });
              this.router.navigate(['login']);
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
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error checking email uniqueness',
        });
      },
    });
  }
  
  get role() {
    return this.registerForm.controls['role'];
  }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  get gender() {
    return this.registerForm.controls['gender'];
  }

  get age() {
    return this.registerForm.controls['age'];
  }
}
