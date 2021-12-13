import { routeTransitionAnimations } from './routeTransitionAnimations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { fader } from '.route-animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations]
})
export class AppComponent {
  title = 'sean-kelly-technical-test';


  public prepareRoute(outlet: RouterOutlet) {
    return outlet && 
      outlet.activatedRouteData && 
      outlet.activatedRouteData?.['animationState'];
  }

}



