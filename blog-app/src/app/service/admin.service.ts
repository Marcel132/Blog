// * The administration service includes checking the permissions of each user with an account
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private firestore: AngularFirestore,
  ) { }
  // Create a new boolean variables isAdmin and isWriter on false
  isAdmin: boolean = false
  isWriter: boolean = false

  // Check the permissions of each user. First we are searching a document that contains user's email. Then if we find a document we are checking the permissions. If we not find, the function will throw an error (false)
  async checkStatus(email: string) {
    const docRef = this.firestore.collection('status').doc(email)
    const doc = await firstValueFrom(docRef.get())
    if(doc && doc !== undefined){
      const isAdmin = doc.get('isAdmin')
      const isWriter = doc.get('isWriter')
      let isUser = 'Użytkownik'
      return {isAdmin, isWriter, isUser}
    } else {
      return false
    }
  }
  // Set the user's permission in document in firebase
  async setUserData(admin: boolean, writer: boolean){
    this.isAdmin = admin
    this.isWriter = writer
  }

  getUserData() {
    return this.firestore.collection('users').valueChanges()
  }
}
