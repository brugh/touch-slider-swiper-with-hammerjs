import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <header>
      <a *ngIf="!!left" mat-icon-button class="left" [routerLink]="left"><mat-icon>chevron_left</mat-icon></a>
      <h1 [routerLink]="'/home'">Swiping test</h1>
      <a *ngIf="!!right" mat-icon-button class="right" [routerLink]="right"><mat-icon>chevron_right</mat-icon></a>
    </header>
  `,
  styles: [`
    header {
      height: 5rem; background: #777a; display: flex;
      align-items: center; justify-content: center; position: relative;  }
    .header h1 { display: inline-block; }
    a { position: absolute; }
    .mat-icon { font-size: 2rem; }
    .left { left: 0; }
    .right { right: 0; }
  `]
})
export class HeaderComponent implements OnInit {
  @Input() left = "";
  @Input() right = "";

  constructor() { }

  ngOnInit(): void {
  }

}
