import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserType } from '@prisma/client';
import { Observable, tap, combineLatest, map } from 'rxjs';
import { EmployeeProfile } from 'src/models/auth/employee-profile.model';
import { AuthService } from 'src/services/auth/auth.service';
import { EmployeeInfo } from '../../models/employees/employee-info.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  authUser!: EmployeeProfile;
  currentUser!: EmployeeInfo;
  ownerId!: string;
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    combineLatest(
      [this.authService.getCurrentUser(), this.authService.authUserAction$]).pipe(
        map(([currentUser, authUser]) => {
          this.authUser = authUser;
          this.ownerId = currentUser.id;
        })
      );

    if (
      this.authService.userType === UserType.Admin ||
      this.ownerId === this.authUser?.id
    )
      return true;
    else {
      this.router.navigate(['/home']);
      return false;
    }
  }

}
