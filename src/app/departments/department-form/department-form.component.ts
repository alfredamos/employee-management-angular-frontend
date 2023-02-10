import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentDto } from '../../../models/departments/department.model';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
})
export class DepartmentFormComponent{
  @Input() departmentForm: FormGroup;
  @Output() onDepartmentForm = new EventEmitter<DepartmentDto>();
  @Output() onBackToList = new EventEmitter<void>();

  constructor(   
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
  
}
