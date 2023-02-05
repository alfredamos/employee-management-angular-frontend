import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { DepartmentDto } from 'src/models/departments/department.model';
import { DepartmentService } from 'src/services/departments/department.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css'],
})
export class EditDepartmentComponent implements OnInit {
  id: string = '';
  departments: DepartmentDto[] = [];
  departmentForm: FormGroup;
  routeParam$ = this.route.paramMap;
  departments$ = this.departmentService.departments$;

  department$ = combineLatest([this.routeParam$, this.departments$]).pipe(
    map(([routeParam, departments]) => {
      this.id = routeParam.get('id') ?? '';
      this.departments = departments;
      return departments.find((department) => department.id === this.id);
    })
  );

  constructor(
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService
  ) {
    this.departmentForm = fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.department$.subscribe((department) => {
      this.departmentForm.patchValue({
        name: department?.name,
      });
    });
  }

  departmentFormSubmit(department: DepartmentDto) {
    department.id = this.id;
    console.log({ department });
    this.departmentService
      .update(this.id, department)
      .subscribe((department) => {
        const index = this.departments.findIndex(department => department.id === this.id);
        this.departments[index] = department;
        this.departmentService.getDepartments$(this.departments);
        this.router.navigate(['/departments']);
      });
  }

  backToList() {
    this.router.navigate(['/departments']);
  }
}
