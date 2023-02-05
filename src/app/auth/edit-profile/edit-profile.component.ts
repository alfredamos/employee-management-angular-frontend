import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { EditProfileDto } from '../../../models/auth/edit-profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup; 

  constructor(private authService: AuthService,    
    private router: Router,
    fb: FormBuilder) {
    this.editProfileForm = fb.group({
      fullName: [''],
      email: [''],
      phone: [''],
      password: [''],
      newPassword: [''],
      gender: [''],
      dateOfBirth: [''],
      departmentId: [''],
    });
  }
  
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
    this.editProfileForm.patchValue({
      ...user,
      password: "",
      newPassword: "",
      dateOfBirth: user.dateOfBirth.toString().substring(0,10),
      departmentId: user.department?.id

    });    
  })
  }

  editProfileSubmit(editProfileDto: EditProfileDto){
    this.authService.editProfile(editProfileDto).subscribe();
    this.router.navigate(['/']);
  }

  backToList(){
    this.router.navigate(['/']);
  }
}
