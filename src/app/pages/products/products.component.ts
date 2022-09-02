import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/store/product.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EntityCollectionService, EntityCollectionServiceFactory } from '@ngrx/data';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule],
  template: `
    <div class="prodcontainer">
    <div>
      <input type="text" name="productName" [(ngModel)]="product.name">
      <button mat-icon-button *ngIf="!product.id" (click)="addProduct()">
        <mat-icon>add</mat-icon>
      </button>
      <button mat-icon-button *ngIf="product.id" (click)="updateProduct()">
        <mat-icon>cached</mat-icon>
      </button>
    </div>
    <table id="products">
      <tr>
        <th>S/N</th>
        <th>Name</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
      <tr *ngFor="let product of allProducts$| async">
        <td>{{product.id}}</td>
        <td>{{product.name}}</td>
        <td><button mat-icon-button (click)="setProductEdit(product)">
          <mat-icon>edit</mat-icon>
        </button></td>
        <td><button mat-icon-button (click)="removeProduct(product)">
          <mat-icon>delete</mat-icon>
        </button></td>
      </tr>
    </table>
    </div>
  `,
  styles: [`
    .prodcontainer { width: 480px; margin: auto; height: 100%;  }
  `]
})
export class ProductsComponent implements OnInit {
  product:Product = { name: ''};
  allProducts$: Observable<Product[]>;
  productService: EntityCollectionService<Product>;

  constructor(entityCollectionServiceFactory: EntityCollectionServiceFactory) {
    this.productService = entityCollectionServiceFactory.create<Product>("Product");
    this.allProducts$ = this.productService.entities$;
  }

  ngOnInit(): void {
    this.getProducts(); 
  }

  getProducts() {
    this.productService.getAll();
  }
  
  setProductEdit(product: Product) {
    this.product = { ...product };
  }
  
  removeProduct(product: Product) {
    if (!product.id) return;
    this.productService.delete(product.id);
  }
  
  addProduct() {
    this.productService.add(this.product);
    this.product = { name: '', id: 0};
  }

  updateProduct() {
    this.productService.update(this.product);
    this.product = { name: '', id: 0};
  }
}

