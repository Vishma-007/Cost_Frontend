import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule, CommonModule,RouterModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;
  selectedRole: string | null = null;
  formData = {
    username: '',
    password: '',
    role:'',
   
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  onLogin() {
    // Clear previous error messages
    this.loginError = null;

    // Check if the form is invalid
    // if (this.loginForm.invalid) {
    //   this.loginError = 'Please fill in all fields.';
    //   return;
    // }

  //   // Extract form values
    

  //   // Simulate login validation (replace with actual authentication logic)
  //   if (
  //     role === 'user' &&
  //     username === 'user@example.com' &&
  //     password === 'password123'
  //   ) {
  //     this.router.navigate(['/user-home']); // Redirect to user home page
  //   } else if (
  //     role === 'admin' &&
  //     username === 'admin@example.com' &&
  //     password === 'admin123'
  //   ) {
  //     this.router.navigate(['/admin-home']); // Redirect to admin home page
  //   } else {
  //     this.loginError = 'Invalid username, password, or role selection.';
  //   }
  // }
  if (this.loginForm.invalid) {
    this.loginError = 'Please fill in all fields.';
    return;
  }

  // Extract form values
  const { username, password, role } = this.loginForm.value;

  // Simulate login validation (replace with actual authentication logic)
  if (
    role === 'user' &&
    username === 'user@example.com' &&
    password === 'password123'
  ) {
    this.router.navigate(['/user-home']); // Redirect to user home page
  } else if (
    role === 'admin' &&
    username === 'admin@example.com' &&
    password === 'admin123'
  ) {
    this.router.navigate(['/admin-home']); // Redirect to admin home page
  } else if (
    role === 'constructor' &&
    username === 'constructor@example.com' &&
    password === 'constructor123'
  ) {
    this.router.navigate(['/constructor-home']); // Redirect to constructor home page
  } else {
    this.loginError = 'Invalid username, password, or role selection.';
  }
}
}


