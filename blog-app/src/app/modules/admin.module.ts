import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from '../components/admin/admin-dashboard/admin-dashboard.component';
import { CreateBlogComponent } from '../components/admin/create-blog/create-blog.component';
import { AdminService } from '../service/admin.service';
import { UsersComponent } from '../components/admin/users/users.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    CreateBlogComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
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
