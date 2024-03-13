import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../account/login/login.component';
import { SignupComponent } from '../account/signup/signup.component';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterModule,
    LoginComponent,
    SignupComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

}
