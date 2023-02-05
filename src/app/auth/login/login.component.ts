import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';
import { LoginDto } from '../../../models/auth/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: [''],
      password: [''],
    });
  }

  loginSubmit(loginDto: LoginDto) {
    console.log('Login input : ', { loginDto });

    this.authService.login(loginDto).subscribe((authLoginUser) => {
      this.router.navigate(['/']);
    });

  }

  backToList() {
    this.router.navigate(['/']);
  }
}
