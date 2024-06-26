import { Component } from '@angular/core'
import { NavigationEnd, RouterModule, Router } from '@angular/router'
import { NavigationComponent } from './components/template/navigation/navigation.component'
import { FooterComponent } from './components/template/footer/footer.component'
import { AccountModule } from './modules/account.module'
import { AppModule } from './modules/app.module'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    NavigationComponent,
    FooterComponent,
    AccountModule,
    AppModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Here is the code for users when someone clicks on the link, it should take him to the top of the page.
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
