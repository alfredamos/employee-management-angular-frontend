import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DepartmentDto } from '../../../models/departments/department.model';
import { Router } from '@angular/router';
import { DepartmentService } from '../../../services/departments/department.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css'],
})
export class CreateDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  departments: DepartmentDto[] = [];

  constructor(
    fb: FormBuilder,
    private router: Router,
    private departmentService: DepartmentService
  ) {
    this.departmentForm = fb.group({
      name: [''],
    });
  }

  ngOnInit() {
    this.departmentService.departments$.subscribe(
      (departments) => (this.departments = departments)
    );
  }

  departmentFormSubmit(department: DepartmentDto) {
    console.log({ department });
    this.departmentService.create(department).subscribe((department) => {
      const newDepartmentList = [...this.departments, department] as DepartmentDto[];
      this.departmentService.getDepartments$(newDepartmentList);
      this.router.navigate(['/departments']);
    });
  }

  backToList() {
    this.router.navigate(['/departments']);
  }
}
