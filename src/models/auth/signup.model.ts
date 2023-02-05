import { Gender } from "../enums/gender.model";
import { UserType } from "../enums/user-type.model";

export class SignupDto{
  fullName!: string;
  email!: string;
  phone!: string;
  password!: string;
  confirmPassword!: string;
  gender!: Gender;
  userType!: UserType;
  dateOfBirth!: string;
  departmentId!: string;
}