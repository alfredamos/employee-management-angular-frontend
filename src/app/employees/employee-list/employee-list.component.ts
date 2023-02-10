import { Component, OnInit} from '@angular/core';
import { EmployeeService } from '../../../services/employees/employee.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { UserType } from 'src/models/enums/user-type.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit{
  isAdmin!: boolean;
  isLoggedIn = false;
  employees$ = this.employeeService.employees$;

  constructor(
    private employeeService:EmployeeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(){
    this.authService.authUserAction$.subscribe(authUser => {
      this.isAdmin = authUser.userType === UserType.Admin;
      this.isLoggedIn = authUser.isLoggedIn!;
    })

  }

  onEmployeeDelete(id: string) {
    this.router.navigate(['/delete-employee', id]);
  }
  onEmployeeDetail(id: string) {
    this.router.navigate(['/employee-detail', id]);
  }

}
