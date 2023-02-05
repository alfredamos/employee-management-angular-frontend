import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { AuthService } from 'src/services/auth/auth.service';
import { EmployeeService } from 'src/services/employees/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit{
  id: string = '';
  isLoggedIn!: boolean;
  routeParam$ = this.route.paramMap;
  employees$ = this.employeeService.employees$;

  employee$ = combineLatest([this.routeParam$, this.employees$]).pipe(
    map(([routeParam, employees]) => {
      const id = routeParam.get('id');
      this.id = id!;
      return employees.find((employee) => employee.id === id);
    })
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(){
    this.authService.authUserAction$.subscribe(
      (authUser) => (this.isLoggedIn = authUser.isLoggedIn!)
    );
  }

  backToList() {
    this.router.navigate(['/']);
  }
}
