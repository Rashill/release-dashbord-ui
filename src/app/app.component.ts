import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

// Google analytics global variable
declare let ga: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  // When this field is set true, it removes class from root component. That causes pre loader to be removed.
  @HostBinding('class.loading') loading = false;

  constructor(public router: Router) {
    // Send goggle analytics info about page change.
    // If you do not need google analytics in your project, you can delete this part
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
}
