import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, data: { left: '/about', right: '/settings' }},
  { path: 'about', component: AboutComponent, data: { right: '/home', animation: 'isLeft' }},
  { path: 'settings', component: SettingsComponent, data: { left: '/home', animation: 'isRight'}}
];
