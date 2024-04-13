import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../service/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

  constructor(private postsService: PostsService){}
  data: any[] = []

  ngOnInit() {
  this.postsService.getPosts().subscribe(posts => {
    this.data = posts;
  });
  }


}
