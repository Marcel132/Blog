import { Component, OnDestroy } from '@angular/core'
import { AccountService } from '../account.service'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy{
  constructor(private accountService: AccountService){}

  // Here we are using getters to access the email and password form controls
  get signupForm(): FormGroup { return this.accountService.signupForm }
  get submitted() { return this.accountService.submitted }
  get invalidEmailOrPassword(){ return this.accountService.invalidEmailOrPassword }
  get email() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('password') }


  // Clear the errors when the user starts typing in the input fields
  clearErrors() {
    this.accountService.submitted = false;
  }

  // If users go to the other page or activate other components then change 'submitted' and 'invalidEmailOrPassword' on false.
  ngOnDestroy() {
    this.accountService.submitted = false
    this.accountService.invalidEmailOrPassword = false
  }

  onSubmit() {
    this.accountService.onSubmitSignup()
  }
}
