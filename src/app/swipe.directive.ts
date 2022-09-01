import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSwipe]',
  standalone: true
})
export class SwipeDirective {

  @HostListener('swipeleft', ['$event']) swipeleft($event:any) { 
    this.onSwipe($event, 'left'); }
  @HostListener('swiperight', ['$event']) swiperight($event:any) { 
    this.onSwipe($event, 'right'); }

  constructor() { }

  onSwipe(e: TouchEvent, dir: string) {
    console.log(e, dir);
  }
}
