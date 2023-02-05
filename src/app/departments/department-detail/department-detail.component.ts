import { Component, OnInit } from "@angular/core";
import { combineLatest, map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/services/departments/department.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css'],
})
export class DepartmentDetailComponent implements OnInit{
  id: string = '';
  isLoggedIn!: boolean;
  routeParam$ = this.route.paramMap;
  departments$ = this.departmentService.departments$;

  department$ = combineLatest([this.routeParam$, this.departments$]).pipe(
    map(([routeParam, departments]) => {
      const id = routeParam.get('id');
      this.id = id!;
      return departments.find((department) => department.id === id);
    })
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.authService.authUserAction$.subscribe(authUser => this.isLoggedIn = authUser.isLoggedIn!)
  }

  backToList() {
    this.router.navigate(['/departments']);
  }
}
