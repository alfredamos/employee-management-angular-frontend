import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SignupComponent } from './auth/signup/signup.component';
import {EmployeeListComponent} from './employees/employee-list/employee-list.component';
import {DepartmentListComponent} from './departments/department-list/department-list.component';
import { DepartmentDetailComponent } from './departments/department-detail/department-detail.component';
import { DeleteDepartmentComponent } from './departments/delete-department/delete-department.component';
import { EditDepartmentComponent } from './departments/edit-department/edit-department.component';
import { CreateDepartmentComponent } from './departments/create-department/create-department.component';
import { DeleteEmployeeComponent } from './employees/delete-employee/delete-employee.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';

const routes: Routes = [
  { path: '', component: EmployeeListComponent }, 
  { path: 'delete-employee/:id', component: DeleteEmployeeComponent },
  { path: 'detail-employee/:id', component: EmployeeDetailComponent }, 

  {path: 'departments', component: DepartmentListComponent},
  {path: 'detail-department/:id', component: DepartmentDetailComponent},
  {path: 'delete-department/:id', component: DeleteDepartmentComponent},
  {path: 'edit-department/:id', component: EditDepartmentComponent},
  {path: 'create-department', component: CreateDepartmentComponent},

  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
