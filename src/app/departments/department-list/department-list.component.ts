import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../services/departments/department.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { UserType } from 'src/models/enums/user-type.model';
import { EmployeeProfile } from 'src/models/auth/employee-profile.model';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  isAdmin!: boolean;
  isLoggedIn!: boolean;
  authUser!: EmployeeProfile;
  departments$ = this.departmentSerVice.departments$;

  constructor(
    private departmentSerVice: DepartmentService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.authUserAction$.subscribe((authUser) => {
      this.authUser = authUser;
      this.isAdmin = authUser.userType === UserType.Admin;
      this.isLoggedIn = authUser.isLoggedIn!;
    });
    
  }

  onDepartmentDelete(id: string) {
    this.router.navigate(['/delete-department', id]);
  }

  onDepartmentEdit(id: string) {
    this.router.navigate(['/edit-department', id]);
  }

  addDepartment(){
    this.router.navigate(['/create-department']);
  }
}
