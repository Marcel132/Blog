import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from '../components/admin/admin-dashboard/admin-dashboard.component';
import { CreateBlogComponent } from '../components/admin/create-blog/create-blog.component';
import { AdminService } from '../service/admin.service';
import { UsersComponent } from '../components/admin/users/users.component';



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
