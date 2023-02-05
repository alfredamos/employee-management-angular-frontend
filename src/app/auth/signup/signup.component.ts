import { Component} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';
import { SignupDto } from 'src/models/auth/signup.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.signupForm = fb.group({
      fullName: [''],
      email: [''],
      phone: [''],
      password: [''],
      confirmPassword: [''],
      gender: [''],
      dateOfBirth: [''],
      departmentId: [''],
    });
  }

  signupSubmit(signupDto: SignupDto) {
    console.log('In signup-submit : ', { signupDto });

    this.authService.signup(signupDto).subscribe();
    this.router.navigate(['/']);
  }

  backToList() {
    this.router.navigate(['/']);
  }
}
