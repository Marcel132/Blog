import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { AdminService } from '../../service/admin.service';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    CreateBlogComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AdminDashboardComponent,
    CreateBlogComponent,
    UsersComponent,
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
