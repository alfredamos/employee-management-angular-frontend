import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { DeleteDepartmentComponent } from './delete-department/delete-department.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { DepartmentFormComponent } from './department-form/department-form.component';


@NgModule({
  declarations: [
    CreateDepartmentComponent,
    EditDepartmentComponent,
    DeleteDepartmentComponent,
    DepartmentListComponent,
    DepartmentDetailComponent,
    DepartmentFormComponent,

  ],
  imports: [SharedModule],
})
export class DepartmentsModule {}
