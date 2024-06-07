import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../service/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../../service/session.service';
import { Router } from '@angular/router';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  constructor(
    private accountService: AccountService,
    private sessionService: SessionService,
    private router: Router,
    private adminService: AdminService,
  ){ }

  userName: string = '-'
  userEmail: string = ''
  userStatus: string = ''
  inputUsername: string = ''
  deletingUserError: boolean = false
  changeUsernameOption: boolean = false


  userSchema = {
    Email: '',
    Status: '',
    uid: '',
  }

  // Take email and username from local storage and status from firebase
  async ngOnInit() {
    let user: any = await this.accountService.userLocalStorage('userSession')
    if(user) {
      this.userEmail = user.email
      let status = await this.adminService.checkStatus(user.email)
      if(status){
        const isAdmin = status.isAdmin
        const isWriter = status.isWriter

        if(isAdmin === true) {
          this.userStatus = 'Administrator'
        } else if(isWriter === true) {
          this.userStatus = 'Pisarz'
        } else {
          this.userStatus = 'Użytkownik'
        }

        console.log(this.userStatus)
      }
    } else {

    }
    let username: any= await this.accountService.userLocalStorage('username')
    if(username){
      this.userName = username
    }
  }

  // Show change name input
  toogleOption(){
    this.changeUsernameOption =  !this.changeUsernameOption
  }

  // Set username in local storage
  setUsername() {
    this.changeUsernameOption = false
    const username = this.inputUsername
    this.sessionService.set('username', username)
    setTimeout(() => {
      window.location.reload()
    }, 200)
  }

  // Route to change password component
  changePassword() {
    this.router.navigate(['/reset_password'])
  }
  // Delete user account
  deleteUserAccount() {
    if (this.accountService.deletingUserError){
      this.deletingUserError = true
    } else {
      this.accountService.deleteUserAccount()
    }
  }
}
