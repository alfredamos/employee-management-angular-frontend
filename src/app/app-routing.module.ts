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
import { LoginGuard } from './guards/login.guard';
import { RoleGuard } from './guards/role.guard';
import { OwnerGuard } from './guards/owner.guard';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  { path: '', component: EmployeeListComponent, canActivate: [LoginGuard] },
  { path: 'delete-employee/:id', component: DeleteEmployeeComponent, canActivate: [LoginGuard, RoleGuard] },
  { path: 'detail-employee/:id', component: EmployeeDetailComponent, canActivate: [LoginGuard, OwnerGuard]},

  {path: 'departments', component: DepartmentListComponent, canActivate: [LoginGuard]},
  {path: 'detail-department/:id', component: DepartmentDetailComponent, canActivate: [LoginGuard]},
  {path: 'delete-department/:id', component: DeleteDepartmentComponent, canActivate: [LoginGuard, RoleGuard]},
  {path: 'edit-department/:id', component: EditDepartmentComponent, canActivate: [LoginGuard, RoleGuard]},
  {path: 'create-department', component: CreateDepartmentComponent, canActivate: [LoginGuard, RoleGuard]},

  { path: 'change-password', component: ChangePasswordComponent, canActivate: [LoginGuard]},
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [LoginGuard, OwnerGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [LoginGuard]},
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
