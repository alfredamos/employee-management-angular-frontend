import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { EmployeeDto } from 'src/models/employees/employee.model';
import { EmployeeService } from 'src/services/employees/employee.service';
import { SharedService } from 'src/services/shared/shared.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent implements OnInit {
  id: string = '';
  showDeleteItem!: boolean;
  employeeList: EmployeeDto[] = [];
  deleteMessage = '';
  deleteTitle = 'Delete Employee';

  employee$ = combineLatest([
    this.route.paramMap,
    this.employeeService.employees$,
  ]).pipe(
    map(([routeParam, employees]) => {
      this.id = routeParam.get('id') ?? '';
      this.employeeList = employees;
      return employees.find((employee) => employee.id === this.id);
    })
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sharedService.showDeleteItemAction$.subscribe(
      (showItem) => (this.showDeleteItem = showItem)
    );
  }

  toDelete() {
    this.employee$.subscribe((employee) => {
      this.deleteMessage = `Do you want to delete the employee with name : ${employee?.fullName}?`;
      this.sharedService.showNextItem(true);
    });
  }

  deleteEmployee(value: boolean) {
    this.sharedService.showNextItem(value);
    if (value) {
      console.log('value : ', value);
      console.log('id : ', this.id);
      const filteredEmployeeList = this.employeeList.filter(
        (employee) => employee.id !== this.id
      );
      this.employeeService.remove(this.id).subscribe((employee) => {
        this.employeeService.getEmployees$(filteredEmployeeList);
        this.router.navigate(['/']);
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  backToList() {
    this.router.navigate(['/']);
  }
}
