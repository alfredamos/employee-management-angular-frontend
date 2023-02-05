import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeProfile } from 'src/models/auth/employee-profile.model';
import { UserType } from 'src/models/enums/user-type.model';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit { 
  authUser!: EmployeeProfile;
 

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {    
    this.authService.authUserAction$.subscribe(authUser => {
      this.authUser = authUser;
      console.log("In NavBar : ", {authUser})
    });
  }

  logout(){ 
    this.authService.logout(this.initialAuthUser())   
    
  }

  initialAuthUser(): EmployeeProfile{
    return {
      id: "",
      fullName: "",
      userType: UserType.Staff,
      token: "",
      isLoggedIn: false,
      message: 'You are not logged in.'

    }
  }

}
