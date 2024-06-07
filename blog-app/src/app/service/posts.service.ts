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

  getPosts() {
    return this.firestore.collection('posts').valueChanges();
  }

  getPostById(id: string) {
    return this.firestore.collection('posts', ref => ref.where('id', '==', id))
    .valueChanges()
    .pipe(
      map((posts: any) => posts[0])
    )
  }

  addPost(data: any) {
    return this.firestore.collection('posts').doc(data.blog_title).set(data);
  }
}
