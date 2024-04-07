import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountModule } from '../../account/account.module';

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
  userEmail: string = '';

  constructor() {}
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
  LogOutButton() {
    localStorage.clear();
    window.location.reload();
  }
}
