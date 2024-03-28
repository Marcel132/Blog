import { Component } from '@angular/core'
import { AccountService } from '../account.service'
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private accountService: AccountService){}

  get signupForm(): FormGroup {
    return this.accountService.signupForm;
  }
  // Email and Passoword
  // Here we are using getters to access the email and password form controls
  get submitted() {
    return this.accountService.submitted
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }


  onSubmit() {
    this.accountService.onSubmitSignup()
  }
}
