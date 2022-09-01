import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SwipeDirective } from 'src/app/swipe.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HammerModule, MatProgressBarModule, SwipeDirective],
  template: `
      <div class="swiper" (pan)="pan($event)" (panend)="panend($event)">
        <div class="slidecontainer" #sc>
          <div *ngFor="let s of slides" class="slide">{{s}}</div>
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
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('sc') sc!: ElementRef<HTMLElement>;
  x = 0;
  w = 0;
  progress = 0;
  slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5', 'Slide 6']

  constructor(private router: Router) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.w = -this.sc.nativeElement.offsetWidth
      + (this.sc.nativeElement.parentElement?.offsetWidth || 0);
  }

  panend(event: any) {
    this.x += event.deltaX;
    if (this.x > 0) this.x = 0;
    if (this.x < this.w) this.x = this.w;
  }
  
  pan(event: any) {
    if (this.x + event.deltaX > 0) return;
    if (this.x + event.deltaX < this.w) return;
    this.progress = Math.round(100 * (this.x + event.deltaX) / this.w);
    this.sc.nativeElement.style.transform = `translateX(${this.x + event.deltaX}px)`;
  }

 }
