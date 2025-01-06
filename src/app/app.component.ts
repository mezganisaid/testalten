import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { ProductsService } from "./products/data-access/products.service";
import { Product } from "./products/data-access/product.model";
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from "primeng/button";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CartbadgeComponent } from "./shared/ui/cart-badge/cartbadge.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, DialogModule, ButtonModule,
    CartbadgeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {

  productCart: Product[] = [];
  display: boolean = false;

  constructor(private cartService: ProductsService){
    this.getCart();
  }


  ShowListOfCart(){
    this.display = true;
  }

  getCart(){
    this.productCart =  this.cartService.getCart();
  }

  
  onDelete(product: Product) {
    this.cartService.removeFromCart(product);
    this.getCart();
  }
  
  title = "ALTEN SHOP";
}
