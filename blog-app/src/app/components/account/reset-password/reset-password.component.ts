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
  
  changePassword(){
    this.accountService.changePassword(this.email)
  }
}
