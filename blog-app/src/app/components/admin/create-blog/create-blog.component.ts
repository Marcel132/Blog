import { Component, HostListener } from '@angular/core';
import { PostsService } from '../../../service/posts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export class CreateBlogComponent {

  showArrow: boolean = true
  blogForm: any

  blog_title: string = ''
  title_1: string = ''
  title_2: string = ''
  title_3: string = ''
  title_4: string = ''
  content_1: string = ''
  content_2: string = ''
  content_3: string = ''
  content_4: string = ''

  constructor(
    private postsService: PostsService,
    private router: Router,
  ){}


  generateId(): string {
    return Math.random().toString(36).substring(2);
  }

  async onSubmit() {
    const blogData: any = {
      blog_title: this.blog_title,
      title_1: this.title_1,
      title_2: this.title_2,
      title_3: this.title_3,
      title_4: this.title_4,
      content_1: this.content_1,
      content_2: this.content_2,
      content_3: this.content_3,
      content_4: this.content_4,
      id: this.generateId(),
    }

    this.postsService.addPost(blogData)
    .then(() => {
      console.log('Success')
      window.location.reload()
    }).catch((error) => {
      console.log('Error' + error)
    })
  }

}
