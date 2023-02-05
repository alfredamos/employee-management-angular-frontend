import { Gender } from '../enums/gender.model';
import { UserType } from '../enums/user-type.model';
import { DepartmentDto } from '../departments/department.model';

export class EmployeeDto {
  id!: string;
  fullName!: string;
  email!: string;
  phone!: string;
  password!: string;
  confirmPassword!: string;
  gender!: Gender;
  userType!: UserType;
  dateOfBirth!: string;
  departmentId!: string;
  department?: DepartmentDto;
}
