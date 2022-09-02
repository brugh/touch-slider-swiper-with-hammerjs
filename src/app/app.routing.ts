import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, data: { left: '/about', right: '/products' }},
  { path: 'about', component: AboutComponent, data: { right: '/home', animation: 'isLeft' }},
  { path: 'products', component: ProductsComponent, data: { left: '/home', animation: 'isRight'}}
];
