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
  departments: DepartmentDto[] = [];
  deleteTitle = 'Delete Department';
  deleteMessage = '';
  isLoggedIn!: boolean;

  routeParam$ = this.route.paramMap;
  departments$ = this.departmentService.departments$;

  department$ = combineLatest([this.routeParam$, this.departments$]).pipe(
    map(([routeParam, departments]) => {
      const id = routeParam.get('id');
      this.id = id!;
      this.departments = departments;
      return departments.find((department) => department.id === id);
    })
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private sharedService: SharedService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.authUserAction$.subscribe(
      (authUser) => (this.isLoggedIn = authUser.isLoggedIn!)
    );
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
      console.log('value : ', value);
      console.log('id : ', this.id);
      const filteredDepartments = this.departments.filter(
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
