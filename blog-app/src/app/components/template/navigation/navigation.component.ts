import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { AccountModule } from '../../account/account.module'
import { Router } from '@angular/router'
import { Admin } from '../../../interface/isAdmin.user'
import { Writter } from '../../../interface/isWritter.user'

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
  isAdmin: boolean = false
  isWritter: boolean = false
  userEmail: string = ''

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof(Storage) !== "undefined") {
      const userData = localStorage.getItem('user') // Create in local storage when user logs in or singup
      if (userData) {
        this.user = JSON.parse(userData)
        this.userEmail = this.user.email
        const adminInArray = Admin.find(u => u.email === this.user.email) // Find the admin in the array
        const writterInArray = Writter.find(u => u.email === this.user.email)

        if(adminInArray && adminInArray.isAdmin) {
          this.isAdmin = true
        }
        else if (writterInArray && writterInArray.isWritter){
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
    localStorage.clear()
    setTimeout(() => {window.location.reload()}, 100)
  }
}
