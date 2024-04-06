import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from './environments/environments';

// Import firebase modules
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    AngularFireModule
  ],
})
export class AppModule { }
