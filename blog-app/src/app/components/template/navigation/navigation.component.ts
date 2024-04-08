import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { AccountModule } from '../../account/account.module'
import { Router } from '@angular/router'
import { User } from '../../../interface/isAdmin.user'

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AccountModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  user: any
  isAdmin: boolean = false
  userEmail: string = ''

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof(Storage) !== "undefined") {
      const userData = localStorage.getItem('user') // Create in local storage when user logs in or singup
      if (userData) {
        this.user = JSON.parse(userData)
        this.userEmail = this.user.email
        const userInArray = User.find(u => u.email === this.user.email) // Find the user in the array
        if(userInArray && userInArray.isAdmin) {
          this.isAdmin = true
        }
        else {
          this.isAdmin = false
        }
      } else {
        this.userEmail = "Gość"
      }
    } else {
      // Local storage is not supported
      console.log('Local storage is not supported')
    }
  }
  LogoutButton() {
    this.router.navigate(['/'])
    localStorage.clear()
    setTimeout(() => {window.location.reload()}, 1000)
  }
}
