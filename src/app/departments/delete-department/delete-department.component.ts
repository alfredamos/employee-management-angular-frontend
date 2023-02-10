import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { DepartmentService } from 'src/services/departments/department.service';
import { SharedService } from '../../../services/shared/shared.service';
import { AuthService } from 'src/services/auth/auth.service';
import { DepartmentDto } from 'src/models/departments/department.model';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.css'],
})
export class DeleteDepartmentComponent implements OnInit {
  id: string = '';
  showDeleteItem = false;
  departmentList: DepartmentDto[] = [];
  deleteTitle = 'Delete Department';
  deleteMessage = '';
  isLoggedIn!: boolean;

  department$ = combineLatest([
    this.route.paramMap,
    this.departmentService.departments$,
  ]).pipe(
    map(([routeParam, departments]) => {
      const id = routeParam.get('id');
      this.id = id!;
      this.departmentList = departments;
      return departments.find((department) => department.id === id);
    })
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sharedService.showDeleteItemAction$.subscribe(
      (showItem) => (this.showDeleteItem = showItem)
    );
  }

  toDelete() {
    this.department$.subscribe((dept) => {
      this.deleteMessage = `Do you want to delete department with name : ${dept?.name}?`;
      this.sharedService.showNextItem(true);
    });
  }

  deleteDepartment(value: boolean) {
    this.sharedService.showNextItem(value);
    if (value) {
      const filteredDepartments = this.departmentList.filter(
        (department) => department.id !== this.id
      );
      this.departmentService.remove(this.id).subscribe((department) => {
        this.departmentService.getDepartments$(filteredDepartments);
        this.router.navigate(['/departments']);
      });
    } else {
      this.router.navigate(['/departments']);
    }
  }

  backToList() {
    this.router.navigate(['/departments']);
  }
}
