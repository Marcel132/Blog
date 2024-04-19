import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Admin } from '../../interface/isAdmin.user';
import { Writter } from '../../interface/isWritter.user';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin.module';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    AdminModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  user: any
  userEmail: string = ''
  isAdmin: boolean = false
  isWritter: boolean = false

  ngOnInit() {
    if(typeof(Storage) !== 'undefined') {
      const userData = localStorage.getItem('user');
      if(userData) {
        this.user = JSON.parse(userData)
        this.userEmail = this.user.email

        const adminInArray = Admin.find(u => u.email === this.userEmail)
        const writterInArray = Writter.find(u => u.email === this.userEmail)

        if(adminInArray && adminInArray.isAdmin) {
          this.isAdmin = true
        } else if(writterInArray && writterInArray.isWritter){
          this.isWritter = true
        } else {
          this.isAdmin = false
          this.isWritter = false
        }
      }
    }
  }

}
