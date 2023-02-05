import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangePasswordDto } from '../../../../models/auth/change-password.model';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {
  @Input() changePasswordForm: FormGroup
  @Output() onChangePasswordValue = new EventEmitter<ChangePasswordDto>();
  @Output() onBackToList = new EventEmitter<void>();

  constructor(fb: FormBuilder) {
    this.changePasswordForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  changePasswordSubmit(){
    this.onChangePasswordValue.emit(this.changePasswordForm.value)
  }

  backToList(){
    this.onBackToList.emit();
  }

}
