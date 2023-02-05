import { HttpClient } from "@angular/common/http";
import { Injectable} from '@angular/core';
import { EmployeeDto } from '../../models/employees/employee.model';
import { BehaviorSubject, EMPTY, Observable, catchError, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from "../auth/auth.service";
import { UserType } from "src/models/enums/user-type.model";
import { EmployeeProfile } from "src/models/auth/employee-profile.model";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService{
  private readonly baseUrl = environment.employeeUrl;

  employeesSubject = new BehaviorSubject<EmployeeDto[]>([]);  
  employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient,
    private authService: AuthService) {
      this.employees$ = this.findAll();
    }

  findOne(id: string): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(`${this.baseUrl}/${id}`).pipe(
      shareReplay(),
      catchError((err) => {
        this.errorCatcher(err);
        return EMPTY;
      })
    );
  }

  findAll(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(this.baseUrl).pipe(
      shareReplay(),
      catchError((err) => {
        this.errorCatcher(err);
        return EMPTY;
      })
    );
  }

  remove(id: string): Observable<EmployeeDto> {
    return this.http.delete<EmployeeDto>(`${this.baseUrl}/${id}`).pipe(
      shareReplay(),
      catchError((err) => {
        this.errorCatcher(err);
        return EMPTY;
      })
    );
  }

  getEmployees$(employees: EmployeeDto[]){
    this.employeesSubject.next(employees);
  }

  initialAuthUser(): EmployeeProfile {
    return {
      id: '',
      fullName: '',
      userType: UserType.Staff,
      token: '',
      isLoggedIn: false,
      message: 'You are not logged in.',
    };
  }

  private errorCatcher(err: any) {
    console.log({ errMessage: err.message });
    this.authService.getAuthUser(this.initialAuthUser());
  }
}
