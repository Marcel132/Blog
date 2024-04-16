import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../service/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss'
})
export class SinglePostComponent {
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ){}

  data: any

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.postsService.getPostById(id).subscribe(post => {
        this.data = post
      });
    }
  }

}
