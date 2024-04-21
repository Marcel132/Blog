import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../service/account.service';
import { CommonModule } from '@angular/common';
import { Writer } from '../../../interface/isWriter.user';
import { Admin } from '../../../interface/isAdmin.user';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../../service/session.service';

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
export class DashboardComponent {

  constructor(
    private accountService: AccountService,
    private sessionService: SessionService,

  ){ }

  userName: string = ''
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

  toogleOption(){
    this.changeUsernameOption =  !this.changeUsernameOption
  }
  setEmail() {
    this.changeUsernameOption = false
    const username = this.inputUsername
    this.sessionService.set('username', username)
    setTimeout(() => {
      window.location.reload()
    }, 200)
  }

  saveData() {
    const data = localStorage.getItem('user')

    if(data) {
      let user = JSON.parse(data)
      this.userSchema.Email = user.email
      this.userSchema.Status = this.userStatus
      this.userSchema.uid = user.uid
      this.accountService.dashboardFunction(this.userSchema)
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

  async ngOnInit() {
    let user: any = await this.accountService.userLocalStorage('user')
    if(user) {
      this.userEmail = user.email
      const adminInArray = Admin.find(u => u.email === user.email) // Find the admin in the array
      const writterInArray = Writer.find(u => u.email === user.email) // Find the writer in the array
      if(adminInArray && adminInArray.isAdmin === true) {
        this.userStatus = 'Administrator'
      } else if(writterInArray && writterInArray.isWriter === true) {
        this.userStatus = 'Pisarz'
      } else {
        this.userStatus = 'Użytkownik'
      }
    }
    let username: any = await this.accountService.userLocalStorage('username')
    if(username){
      this.userName = username
    }
  }
}
