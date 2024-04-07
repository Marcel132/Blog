import { Component, OnDestroy } from '@angular/core'
import { AccountService } from '../../../service/account.service'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  constructor(private accountService: AccountService){ }

  // Here we are using getters to access the email and password form controls from account.service
  get loginForm(): FormGroup { return this.accountService.loginForm }
  get submitted() { return this.accountService.submitted }
  get invalidEmailOrPassword(){ return this.accountService.invalidEmailOrPassword }
  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

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
    const emailValue = this.email?.value as string
    const passwordValue = this.password?.value as string
    this.accountService.onSubmitLogin(emailValue, passwordValue)
  }
}
