import { Injectable } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms';
import { Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  signupForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) { }

  async onSubmit() {
    const email = this.signupForm.value.email
    const password = this.signupForm.value.password
    if (email && password) {
      try {
        await this.afAuth.createUserWithEmailAndPassword(email, password);
        this.router.navigate(['/'])
        alert('Successfully signed up!')
      } catch (error) {
        console.log
      }
    } else {
      // Handle missing email or password here
    }
  }
}
