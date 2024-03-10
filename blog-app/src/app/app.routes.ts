import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { PolicyComponent } from './policy/policy.component';


export const routes: Routes = [
  {path: 'account/login', component: LoginComponent},
  {path: 'account/signup', component: SignupComponent},
  {path: 'socialmedia', component: SocialmediaComponent},
  {path: 'policy', component: PolicyComponent}
];
