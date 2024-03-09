import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';

export const routes: Routes = [
  {path: 'account/login', component: LoginComponent},
  {path: 'account/signup', component: SignupComponent}
];
