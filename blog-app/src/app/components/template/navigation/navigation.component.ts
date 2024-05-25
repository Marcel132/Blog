import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { AccountModule } from '../../../modules/account.module'
import { Router } from '@angular/router'
import { AccountService } from '../../../service/account.service'
import { AdminService } from '../../../service/admin.service'
import { AngularFireAuth } from '@angular/fire/compat/auth'

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
  isHidden: boolean = true;
  isActive: boolean = false;

  userEmail: string = 'Gość'
  isGuest: boolean = true
  isAdmin: boolean = false
  isWriter: boolean = false


  constructor(
    private router: Router,
    private accountService: AccountService,
    private adminService: AdminService,
    private auth: AngularFireAuth
  ) {}

  async ngOnInit() {
    //Check local storage
    let user: any = await this.accountService.userLocalStorage('userSession')
    if(user){
      this.isGuest = false
      this.userEmail = user.email
      let userStatus = await this.adminService.checkStatus(this.userEmail)
      if(userStatus){

        const isAdmin = userStatus.isAdmin
        const isWriter = userStatus.isWriter
        const isUser = userStatus.isUser

        if(isAdmin === true){
          this.isAdmin = true
          this.isGuest = false

        } else if(isWriter === true){
          this.isWriter = true
          this.isGuest = false


        } else if(isUser == "Użytkownik"){
          this.isGuest = false
        }
      }
      else if(user.email){
        this.isGuest = false
      }
    }
  }
  handleClass(){
    this.isActive = !this.isActive
    this.isHidden = !this.isHidden
  }
  logoutButton() {
    this.auth.signOut();
    this.router.navigate(['/'])
    localStorage.removeItem('userSession')
    setTimeout(() => {window.location.reload()}, 100)
  }
}
