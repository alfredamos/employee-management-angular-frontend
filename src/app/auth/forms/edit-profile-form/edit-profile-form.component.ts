import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditProfileDto } from '../../../../models/auth/edit-profile.model';
import { DepartmentDto } from 'src/models/departments/department.model';
import { DepartmentService } from 'src/services/departments/department.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css'],
})
export class EditProfileFormComponent implements OnInit {
  @Input() editProfileForm: FormGroup;
  @Output() onEditProfileValue = new EventEmitter<EditProfileDto>();
  @Output() onBackToList = new EventEmitter<void>();

  departments$= this.departmentService.findAll();

  constructor(private departmentService: DepartmentService, fb: FormBuilder) {
    this.editProfileForm = fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      departmentId: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  editProfileSubmit() {
    this.onEditProfileValue.emit(this.editProfileForm.value);
  }

  backToList() {
    this.onBackToList.emit();
  }
}
