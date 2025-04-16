import { Component, OnInit, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoggedIn = false;
  isLoginFailed = false;
  role = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      if (isPlatformBrowser(this.platformId)) {
        // Clear local storage
        localStorage.clear();
      }

      console.log('Form Submitted', this.loginForm.value);

      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.role = response.user.role;
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          alert('Logged in as ' + this.role + ' successfully');

          this.router.navigate(['/home']);
        },
        err => {
          this.isLoginFailed = true;
          alert('Login Failed: ' + err.error.message);
        }
      );
    }
  }
}
