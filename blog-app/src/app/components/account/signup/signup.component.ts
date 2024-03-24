import { Component } from '@angular/core'
import { AccountService } from '../account.service'
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private accountService: AccountService){ }

  get signupForm(): FormGroup {
    return this.accountService.signupForm;
  }

  onSubmit() {
    this.accountService.onSubmit()
  }
}
