import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, Validators  } from '@angular/forms';
import { Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase  } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase,
    ) { }

  // Check if email is valid
  validateEmail(control: AbstractControl) {
    // Table with all invalid characters
    const validationEmailWords = ['/', ',', '!', '$', '%', '^', '&', '+', '=', '(', ')', '|', '{', '}', '[', ']', "'", '"', '<', '>', '?']
    // Check if email includes table: validationEmailWords
    if(control.value && validationEmailWords.some(word => control.value.includes(word))){
      return {invalidEmail: true}
    }
    return null
  }
  // Check if password is correct
  validatePassword(control: AbstractControl) {
    // Table with all invalid characters
    const validationPasswordCharacters = ['/', ',', '!', '$', '%', '^', '&', '+', '=', '(', ')', '|', '{', '}', '[', ']', "'", '"', '<', '>', '?', '@']
    // Check if password is less than 8 characters
    if (control.value && control.value.length < 8) {
      return {noLetters: true}
    }
    // Check if password includes table: validationPasswordCharacters
    if (control.value && validationPasswordCharacters.some(word => control.value.includes(word))) {
      return {invalidPassword: true}
    }
    return null
  }

  submitted = false
  signupForm = this.fb.group({
    email: ['', [Validators.required, this.validateEmail]],
    password: ['', [Validators.required, this.validatePassword]],
  })
  LoginForm = this.fb.group({
    email: ['', [Validators.required, this.validateEmail]],
    password: ['', [Validators.required, this.validatePassword]],
  })

  // For Signup.component
  async onSubmitSignup() {
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

  // For Login.component
  async onSubmitLogin() {
    this.submitted = true
  }
}
