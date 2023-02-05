import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SignupComponent } from './signup/signup.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { ChangePasswordFormComponent } from './forms/change-password-form/change-password-form.component';
import { EditProfileFormComponent } from './forms/edit-profile-form/edit-profile-form.component';
import { SignupFormComponent } from './forms/signup-form/signup-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    SignupComponent,
    EditProfileComponent,
    LoginFormComponent,
    LogoutComponent,
    ChangePasswordFormComponent,
    EditProfileFormComponent,
    SignupFormComponent,
  ],
  //imports: [ReactiveFormsModule, CommonModule, RouterModule],
  imports: [SharedModule],
})
export class AuthModule {}
