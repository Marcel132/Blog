import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { AccountModule } from '../../../modules/account.module'
import { Router } from '@angular/router'
import { Admin } from '../../../interface/isAdmin.user'
import { Writer } from '../../../interface/isWriter.user'
import { AccountService } from '../../../service/account.service'

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AccountModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  user: any
  isGuest: boolean = true
  isAdmin: boolean = false
  isWritter: boolean = false
  userEmail: string = ''

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {}

  async ngOnInit() {
    //Check if guest
    if(this.isGuest) {
      this.userEmail = 'Gość'
    }

    //Check local storage
    this.user = await this.accountService.userLocalStorage('userSession')
    this.userEmail = this.user.email

    const adminInArray = Admin.find(u => u.email === this.user.email) // Find the admin in the array
    const writterInArray = Writer.find(u => u.email === this.user.email) // Find the writer in the array

    if(adminInArray && adminInArray.isAdmin) {
      this.isAdmin = true
      this.isGuest = false
    }
    else if (writterInArray && writterInArray.isWriter){
      this.isWritter = true
      this.isGuest = false
    }
    else {
      this.isWritter = false
      this.isAdmin = false
      this.isGuest = false
    }


    if (typeof(Storage) !== "undefined") {
      const userData = localStorage.getItem('userSession') // Create in local storage when user logs in or singup
      if (userData) {
        this.user = JSON.parse(userData)
        this.userEmail = this.user.email
        const adminInArray = Admin.find(u => u.email === this.user.email) // Find the admin in the array
        const writterInArray = Writer.find(u => u.email === this.user.email)

        if(adminInArray && adminInArray.isAdmin) {
          this.isAdmin = true
        }
        else if (writterInArray && writterInArray.isWriter){
          this.isWritter = true
        }
        else {
          this.isWritter = false
          this.isAdmin = false
        }
      } else {
        this.userEmail = "Gość"
      }
    }
  }
  LogoutButton() {
    this.router.navigate(['/'])
    localStorage.removeItem('userSession')
    setTimeout(() => {window.location.reload()}, 100)
  }
}
