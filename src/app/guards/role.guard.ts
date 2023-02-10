import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable} from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { UserType } from 'src/models/enums/user-type.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  //authUser!: EmployeeProfile;
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.userType === UserType.Admin) return true;
    else {
      this.router.navigate(['/home']);
      return false;
    }
  }

}
