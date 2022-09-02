import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService  {

  constructor() { }

  createDb() {
    return {
      products: [
        { id: 1, name: 'Seaman Cap' },
        { id: 2, name: 'T-shirt' },
        { id: 3, name: 'Back Pack' },
        { id: 4, name: 'Seaman Cap 2' },
        { id: 5, name: 'Shoes' },
        { id: 6, name: 'Pants' }
      ]
    };
  }
}
