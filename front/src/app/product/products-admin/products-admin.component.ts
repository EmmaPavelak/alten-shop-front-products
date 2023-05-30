import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product.model";
import { ConfirmationService, Message } from "primeng/api";

@Component({
  selector: "app-products-admin",
  templateUrl: "./products-admin.component.html",
  styleUrls: ["./products-admin.component.scss"],
  providers: [ConfirmationService],
})
export class ProductsAdminComponent implements OnInit {
  product: Product = {
    id: null,
    code: "",
    name: "",
    description: "",
    image: "",
    price: 0,
    category: "",
    quantity: 0,
    inventoryStatus: "",
    rating: 0,
  };

  products: Product[];
  initialProducts: Product[];
  selectedProducts: Product[] = [];
  msgs: Message[] = [];
  displayModal = false;

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.initialProducts = [...this.products];
      },
      error: (error: any) => {
        console.error("Error:", error);
      },
    });
  }
  sortTable(event, column: string) {
    const val = event.target.value?.toLowerCase();

    let filteredProducts: Product[];

    if (column === "code") {
      filteredProducts = this.initialProducts.filter((d) => {
        return d.code.toLowerCase().indexOf(val) !== -1 || !val;
      });
    } else if (column === "name") {
      filteredProducts = this.initialProducts.filter((d) => {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      });
    }
    if (!val || val === "") {
      filteredProducts = [...this.initialProducts];
    }

    this.products = filteredProducts;
  }

  isOutOfStock(product: Product): boolean {
    return product.inventoryStatus === "OUTOFSTOCK";
  }
  resetForm(): void {
    this.product = {
      id: null,
      code: "",
      name: "",
      description: "",
      image: "",
      price: 0,
      category: "",
      quantity: 0,
      inventoryStatus: "",
      rating: 0,
    };
  }
  showConfirmDeleteProduct(product: Product): void {
    this.confirmationService.confirm({
      message: "Do you want to delete this product?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.msgs = [
          {
            severity: "success",
            summary: "Confirmed",
            detail: "Product deleted",
          },
        ];
        this.deleteProduct(product);
      },
      reject: () => {
        this.msgs = [
          {
            severity: "info",
            summary: "Rejected",
            detail: "Deletion canceled",
          },
        ];
      },
    });
  }
  showComfirmDeleteSelectedProducts(): void {
    this.confirmationService.confirm({
      message: "Do you want to delete the selected products?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.msgs = [
          {
            severity: "success",
            summary: "Confirmed",
            detail: "Products deleted",
          },
        ];
        this.deleteSelectedProducts();
      },
      reject: () => {
        this.msgs = [
          {
            severity: "info",
            summary: "Rejected",
            detail: "Deletion canceled",
          },
        ];
      },
    });
  }
  showEditProduct(product: Product): void {
    this.displayModal = true;
    this.product = { ...product };
  }
  showAddProduct(): void {
    this.displayModal = true;
  }
  hideDialog(): void {
    this.displayModal = false;
  }

  saveProduct(product: Product): void {
    this.productService.createProduct(product).subscribe({
      next: (data: any) => {
        this.loadProducts();
        this.hideDialog();
      },
      error: (error: any) => {
        console.error("Error:", error);
      },
    });
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product).subscribe({
      next: (data: any) => {
        this.loadProducts();
      },
      error: (error: any) => {
        console.error("Error:", error);
      },
    });
  }
  deleteSelectedProducts(): void {
    this.products.forEach((product) => {
      if (product.selected) {
        this.deleteProduct(product);
      }
    });
  }
}
