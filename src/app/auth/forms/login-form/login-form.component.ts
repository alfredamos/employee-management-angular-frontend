import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginDto } from 'src/models/auth/login.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Input() loginForm: FormGroup;
  @Output() onLoginValue = new EventEmitter<LoginDto>();
  @Output() onBackToList = new EventEmitter<void>();

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  loginFormSubmit() {
    if(this.loginForm.valid) this.onLoginValue.emit(this.loginForm.value);
    else confirm('Invalid input');

  }

  backToList() {
    this.onBackToList.emit();
  }
}
