import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from '../components/other/posts/posts.component';
import { PostsService } from '../service/posts.service';
import { SinglePostComponent } from '../components/other/posts/single-post/single-post.component';


@NgModule({
  declarations: [
    PostsComponent,
    SinglePostComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PostsComponent,
  ],
  providers: [
    PostsService,
  ]
})
export class PostsModule { }
