import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupDto } from 'src/models/auth/signup.model';
import { DepartmentService } from 'src/services/departments/department.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  @Input() signupForm: FormGroup;
  @Output() onSignupValue = new EventEmitter<SignupDto>();
  @Output() onBackToList = new EventEmitter<void>();

  departments$ = this.departmentService.findAll();

  constructor(private departmentService: DepartmentService, fb: FormBuilder) {
    this.signupForm = fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      departmentId: ['', Validators.required],
    });
  }

  signupSubmit() {
    this.onSignupValue.emit(this.signupForm.value);
  }

  backToList() {
    this.onBackToList.emit();
  }
}
