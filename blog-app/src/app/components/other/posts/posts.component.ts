import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../service/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

  constructor(
    private postsService: PostsService,
    private router: Router,
  ){}
  data: any[] = []

  // Get every post from firebase
  ngOnInit() {
  this.postsService.getPosts().subscribe(posts => {
    this.data = posts;
  });
  }

  // For button click, go to the posts with the specified id 
  goToBlog(id: string) {
    this.router.navigate(['/posts', id]);
  }

}
