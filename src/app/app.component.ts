import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { slider } from './app.animations';
import { HeaderComponent } from './components/header/header.component';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  animations: [ // <-- add your animations here
    // fader,
    slider,
    // transformer,
    // stepper
  ],
  selector: 'app-root',
  template: `
    <div class="maincontainer">
      <app-header [left]="left" [right]="right"></app-header>
      <div [@routeAnimations]="prepareRoute(outlet)" class="maincontent">
        <router-outlet #outlet="outlet" (activate)="onActivate(outlet)">
        </router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .maincontainer { min-height: 100vh; overflow: hidden; position: absolute; 
      display: block; width: 100vw; max-height: 100vh; }
    .maincontent { overflow: auto; height: calc(100vh - 5rem); }
  `]
})
export class AppComponent {
  title = 'ngrxdata';
  left = '';
  right = '';

  onActivate(o: any) {
    this.left = o.activatedRouteData['left'];
    this.right = o.activatedRouteData['right'];
    console.log(this.left, this.right)
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}