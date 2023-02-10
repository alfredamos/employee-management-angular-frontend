import { Component} from "@angular/core";
import { combineLatest, map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/services/departments/department.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css'],
})
export class DepartmentDetailComponent{
  id: string = '';
  isLoggedIn!: boolean;
  
  department$ = combineLatest([
    this.route.paramMap,
    this.departmentService.departments$,
  ]).pipe(
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
  ) {}


  backToList() {
    this.router.navigate(['/departments']);
  }
}
