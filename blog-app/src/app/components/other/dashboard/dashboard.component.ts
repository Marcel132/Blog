import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../service/account.service';
import { CommonModule } from '@angular/common';
import { Writer } from '../../../interface/isWriter.user';
import { Admin } from '../../../interface/isAdmin.user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private accountService: AccountService){ }

  userName: string = ''
  userEmail: string = ''
  userStatus: string = ''
  deletingUserError: boolean = false

  ngOnInit() {
    if(typeof(Storage) !== 'undefined'){
      const userData = localStorage.getItem('user')
      if(userData) {

        // Check if user is administrator or writer
        let user = JSON.parse(userData)
        this.userEmail = user.email
        const adminInArray = Admin.find(u => u.email === user.email) // Find the admin in the array
        const writterInArray = Writer.find(u => u.email === user.email)

        if(adminInArray && adminInArray.isAdmin === true) {
          this.userStatus = 'Administrator'
        } else if(writterInArray && writterInArray.isWriter === true) {
          this.userStatus = 'Pisarz'
        } else {
          this.userStatus = 'Użytkownik'
        }

        // Create user data in database
      }
    }
  }

  changePassword() {
    this.accountService.changePassword()
  }
  deleteUserAccount() {
    if (this.accountService.deletingUserError){
      this.deletingUserError = true
    } else {
      this.accountService.deleteUserAccount()
    }

  }


}
