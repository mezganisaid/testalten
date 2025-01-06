import { Component, OnInit, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from "primeng/paginator";
import { SelectItem } from 'primeng/api';

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, PaginatorModule],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  public readonly products = this.productsService.products;
  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  filteredProducts: Product[] = []; 
  totalRecords: number = 0; 
  rows: number = 5; 
  categories: SelectItem[] = []; 
  selectedCategory: string = '';
  productsObjs: Product[] = [];

  constructor(private cartService: ProductsService){}

  ngOnInit() {
    this.cartService.get().subscribe((productsArray: Product[]) => {
      this.productsObjs = productsArray;
      this.filteredProducts = this.productsObjs.slice(0, this.rows);
      this.totalRecords = this.productsObjs.length;
      this.categories = this.getUniqueCategories(this.productsObjs);
    });
  }

  onPage(event: any) {
    const start = event.first;
    const end = start + event.rows;
    this.filteredProducts = this.productsObjs.slice(start, end);
  }
  onFilterCategory() {
    if (this.selectedCategory) {
      this.filteredProducts = this.productsObjs.filter(product => product.category === this.selectedCategory);
    }else{
      this.filteredProducts = this.productsObjs;
    }
    this.totalRecords = this.filteredProducts?.length;
  }

  getUniqueCategories(products: any[]): SelectItem[] {
    const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
    return uniqueCategories.map(category => ({ label: category, value: category }));
  }


  public addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }
  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}
