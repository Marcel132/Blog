import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from '../components/admin/admin-dashboard/admin-dashboard.component';
import { CreateBlogComponent } from '../components/admin/create-blog/create-blog.component';
import { AdminService } from '../service/admin.service';
import { UsersComponent } from '../components/admin/users/users.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../service/posts.service';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    CreateBlogComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdminDashboardComponent,
    CreateBlogComponent,
    UsersComponent,
  ],
  providers: [
    AdminService,
    PostsService
  ]
})
export class AdminModule { }
