import { Component, OnInit } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../product.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title = 'Products';
 // products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;
  errorMessage: string;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }
  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
  }

  constructor(private productService: ProductService) { 

  }

  ngOnInit(): void {
    this.products$ = this
                      .productService
                      .products$
                      .pipe(
                        catchError(
                          error => {
                            this.errorMessage = error;
                            return EMPTY;
                          }
                        )
                      );

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     results => this.products = results
    //   );
  }

}
