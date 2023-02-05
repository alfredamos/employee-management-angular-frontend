import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentDto } from '../../../models/departments/department.model';
import { AuthService } from 'src/services/auth/auth.service';
import { UserType } from 'src/models/enums/user-type.model';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
})
export class DepartmentFormComponent implements OnInit {
  @Input() departmentForm: FormGroup;
  @Output() onDepartmentForm = new EventEmitter<DepartmentDto>();
  @Output() onBackToList = new EventEmitter<void>();
  isAdmin = false;

  constructor(
    private authService: AuthService,
    fb: FormBuilder) {
    this.departmentForm = fb.group({
      name: ['', Validators.required],
    });
  }

  departmentFormSubmit(){
    this.onDepartmentForm.emit(this.departmentForm.value);
  }

  backToList(){
    this.onBackToList.emit();
  }

  ngOnInit(): void {
    this.authService.authUserAction$.subscribe((authUser) => {     
      this.isAdmin = authUser.userType === UserType.Admin;    
    });
  }
}
