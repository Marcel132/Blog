import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    NavigationComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog-app';
}
