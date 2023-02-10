import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { EmployeeService } from 'src/services/employees/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent {
  id: string = '';
  isLoggedIn!: boolean;

  employee$ = combineLatest([
    this.route.paramMap,
    this.employeeService.employees$,
  ]).pipe(
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
  ) {}

  backToList() {
    this.router.navigate(['/']);
  }
}
