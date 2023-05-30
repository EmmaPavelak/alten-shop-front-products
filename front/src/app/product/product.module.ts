import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsAdminComponent } from "./products-admin/products-admin.component";
import { ProductsComponent } from "./products/products.component";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DataViewModule } from "primeng/dataview";
import { RatingModule } from "primeng/rating";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MessagesModule } from "primeng/messages";
import { FormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";

@NgModule({
  declarations: [ProductsAdminComponent, ProductsComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DataViewModule,
    RatingModule,
    InputTextModule,
    DropdownModule,
    ConfirmDialogModule,
    DialogModule,
    MessagesModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductModule {}
