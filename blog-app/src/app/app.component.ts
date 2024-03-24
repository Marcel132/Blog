import { Component } from '@angular/core';
import { NavigationEnd, RouterModule, Router } from '@angular/router';
import { NavigationComponent } from './components/template/navigation/navigation.component';
import { FooterComponent } from './components/template/footer/footer.component';


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
  constructor(private router: Router) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return
      }
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0)
      }
    })
  }
}
