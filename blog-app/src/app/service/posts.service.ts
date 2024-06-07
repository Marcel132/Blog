// * This service is responsible for every connection with database for add or take post

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  // We are getting all posts from firebase
  getPosts() {
    return this.firestore.collection('posts').valueChanges();
  }

  // We are getting all posts from firebase by id
  getPostById(id: string) {
    return this.firestore.collection('posts', ref => ref.where('id', '==', id))
    .valueChanges()
    .pipe(
      map((posts: any) => posts[0])
    )
  }

  // We are adding a new post to firebase
  addPost(data: any) {
    return this.firestore.collection('posts').doc(data.blog_title).set(data);
  }
}
