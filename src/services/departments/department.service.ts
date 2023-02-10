import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateDepartmentDto } from '../../models/departments/create-department.model';
import { EMPTY, Observable, catchError, tap, BehaviorSubject, shareReplay } from 'rxjs';
import { UpdateDepartmentDto } from '../../models/departments/update-department.model';
import { DepartmentDto } from 'src/models/departments/department.model';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { EmployeeProfile } from 'src/models/auth/employee-profile.model';
import { UserType } from 'src/models/enums/user-type.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private readonly baseUrl = environment.departmentUrl;

  departmentsSubject = new BehaviorSubject<DepartmentDto[]>([]);
  departments$ = this.departmentsSubject.asObservable();
  
  

  constructor(private http: HttpClient, private authService: AuthService) {
    this.departments$ = this.findAll();
  }

  create(
    createDepartmentDto: CreateDepartmentDto
  ): Observable<CreateDepartmentDto> {
    return this.http
      .post<CreateDepartmentDto>(this.baseUrl, createDepartmentDto)
      .pipe(
        tap((department) =>
          console.log('In DepartmentService : ', { department })
        ),
        shareReplay(),
        catchError((err) => {
          this.errorCatcher(err);
          return EMPTY;
        })
      );
  }

  findOne(id: string): Observable<DepartmentDto> {
    return this.http.get<DepartmentDto>(`${this.baseUrl}/${id}`).pipe(
      shareReplay(),
      catchError((err) => {
        this.errorCatcher(err);
        return EMPTY;
      })
    );
  }

  findAll(): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(this.baseUrl).pipe(
      shareReplay(),
      catchError((err) => {
        this.errorCatcher(err);
        return EMPTY;
      })
    );
  }

  update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto
  ): Observable<UpdateDepartmentDto> {
    return this.http
      .patch<UpdateDepartmentDto>(`${this.baseUrl}/${id}`, updateDepartmentDto)
      .pipe(
        shareReplay(),
        catchError((err) => {
          this.errorCatcher(err);
          return EMPTY;
        })
      );
  }

  remove(id: string): Observable<DepartmentDto> {
    return this.http.delete<DepartmentDto>(`${this.baseUrl}/${id}`).pipe(
      shareReplay(),
      catchError((err) => {
        this.errorCatcher(err);
        return EMPTY;
      })
    );
  }

  getDepartments$(departments: DepartmentDto[]) {
    this.departmentsSubject.next(departments);
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
    this.authService.getAuthUser$(this.initialAuthUser());
  }
}
