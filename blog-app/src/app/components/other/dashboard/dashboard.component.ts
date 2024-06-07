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

  userName: string = 'Nieznany'
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

  toogleOption(){
    this.changeUsernameOption =  !this.changeUsernameOption
  }
  setUsername() {
    this.changeUsernameOption = false
    const username = this.inputUsername
    this.sessionService.set('username', username)
    setTimeout(() => {
      window.location.reload()
    }, 200)
  }

  // async saveData() {
  //   const user: any = await this.accountService.userLocalStorage('userSession')
  //   if(user) {
  //     this.accountService.saveUserData(user.email, this.userStatus, user.uid)
  //   }
  // }
  changePassword() {
    this.router.navigate(['/reset_password'])
  }
  deleteUserAccount() {
    if (this.accountService.deletingUserError){
      this.deletingUserError = true
    } else {
      this.accountService.deleteUserAccount()
    }
  }
}
