import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NavigationModule } from './components/navigation/navigation.module';
import { FooterModule } from './components/footer/footer.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    NavigationModule,
    FooterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
