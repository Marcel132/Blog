import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, Validators  } from '@angular/forms';
import { Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  validateEmail(control: AbstractControl) {
    const validationEmailWords = ['/', ',', '!', '$', '%', '^', '&', '+', '=', '(', ')', '|', '{', '}', '[', ']', "'", '"', '<', '>', '?']
    if(control.value && validationEmailWords.some(word => control.value.includes(word))){
      return {invalidEmail: true}
    }
    return null
  }
  validatePassword(control: AbstractControl) {
    const validationPasswordWords = ['/', ',', '!', '$', '%', '^', '&', '+', '=', '(', ')', '|', '{', '}', '[', ']', "'", '"', '<', '>', '?', '@']
    if (control.value && control.value.length < 8) {
      return {noLetters: true}
    }
    if (control.value && validationPasswordWords.some(word => control.value.includes(word))) {
      return {invalidPassword: true}
    }
    return null
  }

  submitted = false
  signupForm = this.fb.group({
    email: ['', [Validators.required, this.validateEmail]],
    password: ['', [Validators.required, this.validatePassword]],
  })
  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) { }

  async onSubmit() {
    this.submitted = true
    if (this.signupForm.valid) {
      const email = this.signupForm.value.email
      const password = this.signupForm.value.password

      if(email && password){
        try {
          await this.afAuth.createUserWithEmailAndPassword(email, password)
          this.router.navigate(['/'])
          console.log("User created")
        } catch (error) {
          this.router.navigate(['/signup'])
          console.log(error)
        }
      } else {

      }
    }
    else if(this.signupForm.invalid){

    }
  }
}
