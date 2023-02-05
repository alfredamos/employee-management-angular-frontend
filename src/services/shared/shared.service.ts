import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService{
  private showDeleteSubject = new BehaviorSubject<boolean>(false);
  showDeleteItemAction$ =  this.showDeleteSubject.asObservable();

  showNextItem(value: boolean){
    this.showDeleteSubject.next(value);
  }
}