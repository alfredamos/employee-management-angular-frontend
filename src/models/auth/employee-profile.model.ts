import { UserType } from "../enums/user-type.model";

export class EmployeeProfile {
  id!: string;
  fullName!: string;
  userType!: UserType;
  token?: string;
  message?: string;
  isLoggedIn?: boolean;
}
