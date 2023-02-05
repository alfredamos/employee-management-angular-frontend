import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../../models/auth/login.model';
import { Observable, BehaviorSubject, tap, catchError, EMPTY } from 'rxjs';
import { SignupDto } from 'src/models/auth/signup.model';
import { EditProfileDto } from '../../models/auth/edit-profile.model';
import { ChangePasswordDto } from '../../models/auth/change-password.model';
import { environment } from 'src/environments/environment';
import { EmployeeProfile } from '../../models/auth/employee-profile.model';
import { EmployeeInfo } from '../../models/employees/employee-info.model';
import { UserType } from 'src/models/enums/user-type.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUser = new BehaviorSubject(this.initialAuthUser());
  authUserAction$ = this.authUser.asObservable();

  constructor(private http: HttpClient) {}

  changePassword(
    changePasswordDto: ChangePasswordDto
  ): Observable<EmployeeProfile> {
    return this.http
      .patch<EmployeeProfile>(
        environment.auth.changePasswordUrl,
        changePasswordDto
      )
      .pipe(
        catchError((err) => {
          this.errorCatcher(err);
          return EMPTY;
        })
      );
  }

  editProfile(editProfileDto: EditProfileDto): Observable<EmployeeProfile> {
    return this.http
      .patch<EmployeeProfile>(environment.auth.editProfileUrl, editProfileDto)
      .pipe(
        catchError((err) => {
          this.errorCatcher(err);
          return EMPTY;
        })
      );
  }

  getUserCredentials(): Observable<EmployeeProfile> {
    return this.http.get<EmployeeProfile>(environment.auth.userCredentialsUrl);
  }

  getJwtToken(): string {
    return localStorage.getItem('token')!;
  }

  getCurrentUser(): Observable<EmployeeInfo> {
    return this.http.get<EmployeeInfo>(environment.currentUserUrl);
  }

  login(loginDto: LoginDto): Observable<EmployeeProfile> {
    return this.http
      .post<EmployeeProfile>(environment.auth.loginUrl, loginDto)
      .pipe(
        tap((user) => {
          localStorage.setItem('token', user.token!);
          this.getAuthUser(user);
        })
      )
      .pipe(
        catchError((err) => {
          this.errorCatcher(err);
          return EMPTY;
        })
      );
  }

  signup(signupDto: SignupDto): Observable<EmployeeProfile> {
    return this.http.post<EmployeeProfile>(
      environment.auth.signupUrl,
      signupDto
    ).pipe(
      catchError(err => {
        this.errorCatcher(err);
        return EMPTY
      })
    );
  }


  getAuthUser(value: EmployeeProfile): void {
    this.authUser.next(value);
  }

  logout(user: EmployeeProfile): void {
    this.getAuthUser(user);
    localStorage.setItem('token', user.token!);
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

  private errorCatcher(err: any){
    console.log({errMessage: err.message});
    this.getAuthUser(this.initialAuthUser());
  }
}
