import { enableProdMode, importProvidersFrom, Injectable } from '@angular/core';
import { bootstrapApplication, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import * as Hammer from 'hammerjs';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routing';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
@Injectable()
export class HammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    'pan': { direction: Hammer.DIRECTION_HORIZONTAL },
    'pinch': { enable: false },
    'rotate': { enable: false }
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      FormsModule,
      HammerModule,
      MatProgressBarModule,
      MatButtonModule, 
      MatIconModule
    ),
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    },]
})