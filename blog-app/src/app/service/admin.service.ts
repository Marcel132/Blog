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
  isAdmin: boolean = false
  isWriter: boolean = false

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
  async setUserData(admin: boolean, writer: boolean){
    this.isAdmin = admin
    this.isWriter = writer
  }

  getUserData() {
    return this.firestore.collection('users').valueChanges()
  }
}
