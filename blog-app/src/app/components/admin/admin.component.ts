import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminModule } from '../../modules/admin.module';
import { AccountService } from '../../service/account.service';
import { AdminService } from '../../service/admin.service';


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
export class AdminComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private adminService: AdminService,
  ) {}

  showArrow: boolean = false
  isAdmin: boolean = false
  isWriter: boolean = false

  async ngOnInit() {
    let user: any = await this.accountService.userLocalStorage('userSession')
    if(user){
      let userStatus = await this.adminService.checkStatus(user.email)
      if(userStatus){
        const isAdmin = userStatus.isAdmin
        const isWriter = userStatus.isWriter

        if(isAdmin === true){
          this.isAdmin = true
        } else if(isWriter === true) {
          this.isWriter = true
        } else {
          this.isAdmin = false
          this.isWriter = false
        }

        this.adminService.setUserData(isAdmin, isWriter)
      }
    }
  }
}
