import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit{
  @Input() deleteTitle = "";
  @Input() deleteMessage = "";
  showDeleteItem!: boolean;
  @Output() onDeleteItem = new EventEmitter<boolean>();

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.showDeleteItemAction$.subscribe(showItem =>
      {this.showDeleteItem = showItem;
        console.log({ showDeleteItem: this.showDeleteItem });

      }) 
  }

  deleteItem(value: boolean){
    this.onDeleteItem.emit(value);
  }

}
