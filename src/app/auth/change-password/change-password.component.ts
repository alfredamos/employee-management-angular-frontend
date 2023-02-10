import { Component} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ChangePasswordDto } from '../../../models/auth/change-password.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    fb: FormBuilder
    ) {
      this.changePasswordForm = fb.group({
        email: [''],
        oldPassword: [''],
        newPassword: [''],
        confirmPassword: ['']
      });
    }

    changePasswordSubmit(changePasswordDto: ChangePasswordDto){
      this.authService.changePassword(changePasswordDto).subscribe();
      this.router.navigate(['/']);
    }

    backToList(){
      this.router.navigate(['/']);
    }
}
