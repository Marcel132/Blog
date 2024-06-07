import { Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { SocialmediaComponent } from './components/other/socialmedia/socialmedia.component';
import { PolicyComponent } from './components/other/policy/policy.component';
import { AboutUsComponent } from './components/other/about-us/about-us.component';
import { RegulationsComponent } from './components/other/regulations/regulations.component';
import { DashboardComponent } from './components/other/dashboard/dashboard.component';
import { PostsComponent } from './components/other/posts/posts.component';
import { SinglePostComponent } from './components/other/posts/single-post/single-post.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { CreateBlogComponent } from './components/admin/create-blog/create-blog.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component';


export const routes: Routes = [
  // {path: '', redirectTo: '', pathMatch: 'full'}, // Default route path is posts
  {path: '', component: PostsComponent},
  {path: 'posts/:id', component: SinglePostComponent},
  {path: 'account/login', component: LoginComponent},
  {path: 'account/signup', component: SignupComponent},
  {path: 'reset_password', component: ResetPasswordComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'socialmedia', component: SocialmediaComponent},
  {path: 'policy', component: PolicyComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'regulations', component: RegulationsComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path: '', component: AdminDashboardComponent},
    {path: 'createblog', component: CreateBlogComponent},
    {path: 'users', component: UsersComponent},
  ]}
];

