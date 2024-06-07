import { Component } from '@angular/core';

@Component({
  selector: 'app-socialmedia',
  standalone: true,
  template: `
  <div class="f-container">
    <div class="f-wrapper">
      <h2>Witaj</h2>
      <p>Jeśli spodobał ci się nasz kontent, odwiedź nas na naszych mediach społecznościowych</p><br>
      <strong title='Link to Facebook'><a href="https://facebook.com" target='_blank'>Facebook</a></strong><br>
      <strong title='Link to Twitter / X'><a href="https://x.com" target='_blank'>X</a></strong>
    </div>
  </div>
  `,
  styleUrl: './socialmedia.component.scss'
})
export class SocialmediaComponent {

}
