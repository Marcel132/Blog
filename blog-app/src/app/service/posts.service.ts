import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getPosts() {
    return this.firestore.collection('posts').valueChanges();
  }
}
