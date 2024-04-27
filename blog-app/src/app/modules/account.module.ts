import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/account/login/login.component';
import { SignupComponent } from '../components/account/signup/signup.component';
import { AccountService } from '../service/account.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from '../components/account/reset-password/reset-password.component';
import { AdminService } from '../service/admin.service';




@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent
  ],
  providers: [
    AccountService,
    AdminService
  ]
})
export class AccountModule {
}
