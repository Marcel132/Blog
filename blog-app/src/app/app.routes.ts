import { Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { SocialmediaComponent } from './components/other/socialmedia/socialmedia.component';
import { PolicyComponent } from './components/other/policy/policy.component';


export const routes: Routes = [
  {path: 'account/login', component: LoginComponent},
  {path: 'account/signup', component: SignupComponent},
  {path: 'socialmedia', component: SocialmediaComponent},
  {path: 'policy', component: PolicyComponent}
];
