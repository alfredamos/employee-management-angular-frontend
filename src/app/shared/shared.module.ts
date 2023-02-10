import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router"
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { LogoutFeedbackComponent } from './logout-feedback/logout-feedback.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [DeleteItemComponent, LogoutFeedbackComponent, HomeComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    DeleteItemComponent,
    LogoutFeedbackComponent,
    RouterModule,
    HomeComponent
  ],
})
export class SharedModule {}
