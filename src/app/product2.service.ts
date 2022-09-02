import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap, catchError, throwError } from 'rxjs';
import { Product } from './store/product.model';

@Injectable({
  providedIn: 'root'
})
export class Product2Service {
  private productsUrl = 'api/products/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      retry(2),
      tap(data => console.log(data)),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
  
  createProduct(product: Product): Observable<Product> {
    // product.id = null;
    return this.http.post<Product>(this.productsUrl, product).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editProduct(product: Product): Observable<any> {
    return this.http.put(this.productsUrl + product.id, product);
  }

  deleteProduct(id: string | null): Observable<any> {
    return this.http.delete(this.productsUrl + id);
  }
}
