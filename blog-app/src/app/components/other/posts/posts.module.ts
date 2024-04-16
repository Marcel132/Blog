import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsService } from '../../../service/posts.service';
import { SinglePostComponent } from './single-post/single-post.component';


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
