import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private accountService: AccountService){ }

  // Here we are using getters to access the email and password form controls from account.service
  get LoginForm(): FormGroup {
    return this.accountService.signupForm;
  }
  get submitted() {
    return this.accountService.submitted
  }
  get email() {
    return this.LoginForm.get('email');
  }
  get password() {
    return this.LoginForm.get('password');
  }


  onSubmit() {
    this.accountService.onSubmitLogin()
  }
}
