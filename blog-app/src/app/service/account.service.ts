// Here are every function that is using to control the account of the user

import { Injectable } from '@angular/core'
import { AbstractControl, FormBuilder, Validators  } from '@angular/forms'
import { Router} from '@angular/router'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { SessionService } from './session.service'


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private sessionService: SessionService,
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
    // Check if password includes table: validationPasswordCharacters
    if (control.value && validationPasswordCharacters.some(word => control.value.includes(word))) {
      return {invalidPassword: true}
    }
    // Check if password is less than 8 characters
    if (control.value && control.value.length < 8) {
      return {noLetters: true}
    }
    return null
  }

  submitted = false
  invalidEmailOrPassword = false
  signupForm = this.fb.group({
    email: ['', [Validators.required, this.validateEmail]],
    password: ['', [Validators.required, this.validatePassword]],
  })
  loginForm = this.fb.group({
    email: ['', [Validators.required, this.validateEmail]],
    password: ['', [Validators.required, this.validatePassword]],
  })

  // ---------------------
  // For Signup.component
  // ---------------------
  async onSubmitSignup(email: string, password: string) {
    this.submitted = true
    if(this.signupForm.valid){
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((Credentials) => {
        let user = Credentials.user
        if(user){
          this.sessionService.set('user', user)
          this.router.navigate(['/'])
          console.log(user + ' signup')
          setTimeout(() => {window.location.reload()}, 100)
        }
        else {
          console.log("Cannot signup")
        }
      })
      .catch((error) => {
        this.invalidEmailOrPassword = true
        let errorCode = error.code
        let errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
    }
  }
  // async onSubmitSignup() {
  //   // Change the variable on true, when user click signup button
  //   this.submitted = true
  //   if (this.signupForm.valid) {
  //     // Check if email and password are valid
  //     const email = this.signupForm.value.email
  //     const password = this.signupForm.value.password

  //     // If data is valid, create a new user in database
  //     if(email && password){
  //       try {
  //         await this.afAuth.createUserWithEmailAndPassword(email, password)
  //         this.router.navigate(['/'])
  //         const user = [email, password]
  //         this.sessionService.set('user', user)
  //         console.log("User created")
  //       } catch (error) {
  //         this.invalidEmailOrPassword = true
  //         console.log(error)
  //       }
  //     }
  //   }
  // }

  // ---------------------
  // For Login.component
  // ---------------------
  async onSubmitLogin(email: string, password: string) {
    // Change the variable on true, when user click signup button
    this.submitted = true
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then((Credential) => {
      // Signed in
      let user = Credential.user
      if (user) {
        this.sessionService.set('user', user)
        this.router.navigate(['/'])
      }
      setTimeout(() => {window.location.reload()}, 100)
    })
    .catch((error) => {
      this.invalidEmailOrPassword = true
      let errorCode = error.code
      let errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
  }

  async changePassword() {
    const data = this.sessionService.get('user')
    let email = data.email
      this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Email sent')
      })
  }
  async deleteUserAccount() {
    const user = await this.afAuth.currentUser;
    if(user) {
      user.delete().then(() => {
        this.sessionService.clear()
        this.router.navigate(['/'])
        setTimeout(() => {window.location.reload()}, 100)
        console.log('User deleted successfully');
      }).catch((error) => {
        console.error('Error deleting user', error);
      });
    }
  }

}
