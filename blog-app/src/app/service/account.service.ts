// * Here are every function that is using to control the account of the user

import { Injectable } from '@angular/core'
import { AbstractControl, FormBuilder, Validators  } from '@angular/forms'
import { Router} from '@angular/router'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { SessionService } from './session.service'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
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

  // For login and signup forms
  submitted: boolean = false
  invalidEmailOrPassword: boolean = false

  // For deleting user
  deletingUserError: boolean = false

  // For reset password form
  isEmailTrue: boolean = false
  invalidEmail: boolean = false

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

  // If user writes valid data, we will create a new user in database and new session in local storage. In every register we are checking a permission (Every permission we will find in document in database)
  async onSubmitSignup(email: string, password: string) {
    this.submitted = true
    if(this.signupForm.valid){
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async (Credentials) => {
        let user = Credentials.user
        if(user){
          this.sessionService.set('userSession', user)
          let userSession: any = await this.userLocalStorage('userSession')
          console.log(userSession)
          if(userSession){
            let defaultStatus = await this.checkStatus(userSession.email)
            if(defaultStatus === false){
              defaultStatus = 'Użytkownik'
            }
            this.saveUserData(userSession.email, defaultStatus, userSession.uid)
            this.router.navigate(['/'])
            setTimeout(() => {window.location.reload()}, 2000)
          }
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

  // ---------------------
  // For Login.component
  // ---------------------

  // Check a valid data from form and database. If are valid, we create a user local storage and login to website
  async onSubmitLogin(email: string, password: string) {
    // Change the variable on true, when user click signup button
    this.submitted = true
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(async (Credential) => {
      // Login
      let user = Credential.user
      if (user) {
        this.sessionService.set('userSession', user)
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

  // Create a new document for every user that signup to the blog
  async saveUserData(email: string, status: string, uid: string) {
    // Take date and time
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    let createdAt = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`

    let userSchema = {
      Email: email,
      Status: status,
      CreatedAt: createdAt,
      uid: uid,
    }
    try {
      await this.firestore.collection('users').doc(userSchema.uid).set(userSchema)
    } catch(error) {
      console.log(error)
    }
  }

  // ---------------------
  // For Reset-password.component
  // ---------------------

  // Send a reset password email
  async changePassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email)
  }

  // Delete an user account from the database and clear local storage
  async deleteUserAccount() {
    const user = await this.afAuth.currentUser;
    if(user) {
      user.delete().then(() => {
        this.firestore.collection('users').doc(user.uid).delete()
        this.sessionService.clear()
        this.router.navigate(['/'])
        setTimeout(() => {window.location.reload()}, 500)
        console.log('User deleted successfully');
      }).catch((error) => {
        console.error('Error deleting user', error);
        this.deletingUserError = true
      });
    }
  }

  // Check if the user has a local storage
  async userLocalStorage(nameStorage: string) {
    return new Promise((resolve, reject) => {
      if(typeof(Storage) !== 'undefined'){
        const data = localStorage.getItem(nameStorage)
        if(data) {
          let parseData = JSON.parse(data)
          resolve(parseData)
        }
        else {
          reject("Data not found: " + nameStorage)
        }
      }
      else {

      }
    })
  }

  // Check status and update user status in dashboard
  async checkStatus(email: string) {
    const docRef = this.firestore.collection('status').doc(email)
    const doc = await firstValueFrom(docRef.get())
    if(doc && doc !== undefined){
      const isAdmin = doc.get('isAdmin')
      const isWriter = doc.get('isWriter')
      let isUser = 'Użytkownik'
      if(isAdmin === true){
        return 'Administrator'
      }
      else if(isWriter === true){
        return 'Pisarz'
      } else {
        return isUser
      }
    } else {
      return false
    }
  }
}
