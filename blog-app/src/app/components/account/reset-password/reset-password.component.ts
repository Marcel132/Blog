import { Component } from '@angular/core';
import { AccountService } from '../../../service/account.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  constructor(
    private accountService: AccountService,
  ) {}

  email: string = ''
  isEmailTrue: boolean = false
  sendLink: boolean = false
  invalidEmail: boolean = false

  clearErrors() {
    this.invalidEmail = false
  }
  
  async checkEmail() {
    try {
      this.isEmailTrue = await this.accountService.checkEmail(this.email);
    } catch (error) {
      this.invalidEmail = true
      console.log(error)
    }
  }

  changePassword(){
    this.accountService.changePassword(this.email, this.sendLink)
  }
}
