import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsService } from '../../../service/posts.service';


@NgModule({
  declarations: [
    PostsComponent
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
