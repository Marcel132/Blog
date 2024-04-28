import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environments';

// Import firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { PostsModule } from './posts.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PostsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    AngularFireModule
  ],
})
export class AppModule { }
