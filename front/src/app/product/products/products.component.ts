import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product.model";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  initialProducts: Product[] = [];
  totalRecords: number = 0;
  rows: number = 10;
  page: number = 1;
  layout: string = "list";
  sortKey = null;
  sortOptions: any = [
    { label: "Price High to Low", value: "!price" },
    { label: "Price Low to High", value: "price" },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.initialProducts = [...this.products];
      this.totalRecords = this.products.length;
    });
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
  }
  sortTable(event): void {
    const val = event.target.value?.toLowerCase();

    let filteredProducts: Product[];

    filteredProducts = this.initialProducts.filter((d) => {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    if (!val || val === "") {
      // If the search field is empty, restore all products
      filteredProducts = [...this.initialProducts];
    }

    // Reassign filtered products to products array
    this.products = filteredProducts;
  }
  onSortChange(event): void {
    const value = event.value;
    if (value === "!price") {
      this.products.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (value === "price") {
      this.products.sort((a, b) => {
        return a.price - b.price;
      });
    }
  }
}
