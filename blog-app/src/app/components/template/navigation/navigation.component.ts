import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountModule } from '../../account/account.module';
import { Router } from '@angular/router'

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
  user: any;
  isAdmin: boolean = true
  userEmail: string = '';

  constructor(private router: Router) {}
    ngOnInit() {
      if (typeof(Storage) !== "undefined") {
        const userData = localStorage.getItem('user');
        if (userData) {
          this.user = JSON.parse(userData);
          this.userEmail = this.user.email;
        } else {
          this.userEmail = "Gość";
        }
      } else {
        // Local storage is not supported
        console.log('Local storage is not supported by your browser.');
      }
    }
  LogoutButton() {
    this.router.navigate(['/']);
    localStorage.clear();
    setTimeout(() => {window.location.reload()}, 1000)
  }
}
