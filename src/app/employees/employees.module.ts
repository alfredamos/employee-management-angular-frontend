import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';

@NgModule({
  declarations: [
    EmployeeDetailComponent,
    EmployeeListComponent,
    DeleteEmployeeComponent,
  ],
  imports: [SharedModule],
})
export class EmployeesModule {}
