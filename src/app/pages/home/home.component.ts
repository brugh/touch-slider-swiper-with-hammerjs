import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SwipeDirective } from 'src/app/swipe.directive';
import { ProductService } from 'src/app/product.service';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { Product } from 'src/app/store/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HammerModule, MatProgressBarModule, SwipeDirective],
  template: `
      <div class="swiper" (pan)="pan($event)" (panend)="panend($event)">
        <div class="slidecontainer" #sc>
          <div *ngFor="let s of slides$ | async as slides" class="slide">{{s.name}}</div>
        </div>
      </div>
      <div class="progress">{{progress}}% 
        <mat-progress-bar mode="determinate" [value]="progress"></mat-progress-bar>
      </div>
  `,
  styles: [`
    .swiper { width: 480px; height: 120px; border: 1px solid blue; overflow: hidden; margin: auto;}
    .slide { margin-right: 20px; width: 180px; height: 100px; min-height: 100px; 
      display: inline-flex; justify-content: center; align-items: center; 
      flex-direction: row; overflow: hidden; border: 2px inset red;}
    .slide:last-child { margin-right: 0; }
    .slidecontainer { width: max-content; height: 100%; display: flex; }
     .progress { margin: auto; width: 480px; height: 10px; }
  `]
})
export class HomeComponent implements OnInit{
  @ViewChild('sc') sc!: ElementRef<HTMLElement>;
  x = 0;
  w = 0;
  progress = 0;
  productService: EntityCollectionService<Product>;
  slides$: Observable<Product[]>;

  constructor(entityCollectionServiceFactory: EntityCollectionServiceFactory) {
    this.productService = entityCollectionServiceFactory.create<Product>("Product");
    this.slides$ = this.productService.entities$;
    this.productService.getAll();
  }

  ngOnInit(): void { }
  
  panend(event: any) {
    this.x += event.deltaX;
    if (this.x > 0) this.x = 0;
    if (this.x < this.w) this.x = this.w;
  }
  
  pan(event: any) {
    this.w = -this.sc.nativeElement.offsetWidth
    + (this.sc.nativeElement.parentElement?.offsetWidth || 0);
    if (this.x + event.deltaX > 0) return;
    if (this.x + event.deltaX < this.w) return;
    this.progress = Math.round(100 * (this.x + event.deltaX) / this.w);
    this.sc.nativeElement.style.transform = `translateX(${this.x + event.deltaX}px)`;
  }

}
