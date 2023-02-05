import { Gender } from '../enums/gender.model';
import { DepartmentDto } from '../departments/department.model';

export class EmployeeInfo {
  id!: string;
  fullName!: string;
  email!: string;
  phone!: string; 
  gender!: Gender;  
  dateOfBirth!: string;
  department!: DepartmentDto;
}
