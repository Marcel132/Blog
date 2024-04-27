import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Admin } from '../../interface/isAdmin.user';
import { Writer } from '../../interface/isWriter.user';
import { CommonModule } from '@angular/common';
import { AdminModule } from '../../modules/admin.module';
import { AccountService } from '../../service/account.service';


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

  constructor(
    private accountService: AccountService,
  ) {}

  user: any
  userEmail: string = ''
  isAdmin: boolean = false
  isWriter: boolean = false

  async ngOnInit() {
    let user: any = await this.accountService.userLocalStorage('userSession')
    if(user) {

      const adminInArray = Admin.find(u => u.email === user.email)
      const writterInArray = Writer.find(u => u.email === user.email)

      this.isAdmin = (adminInArray && adminInArray.isAdmin === true) ? true : false
      this.isWriter = (writterInArray && writterInArray.isWriter === true) ? true : false

    }
  }
}
