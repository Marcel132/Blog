import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../service/account.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private accountService: AccountService){ }

  userEmail: string = ''

  ngOnInit() {
    if(typeof(Storage) !== 'undefined'){
      const userData = localStorage.getItem('user')
      if(userData) {
        let user = JSON.parse(userData)
        this.userEmail = user.email
      }
    }
  }

  changePassword() {
    this.accountService.changePassword()
  }
  deleteUserAccount() {
    this.accountService.deleteUserAccount()
  }


}
