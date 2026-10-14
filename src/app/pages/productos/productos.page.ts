import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, } from '@ionic/angular';
import { ProductsService } from '../../services/products';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, CommonModule, FormsModule]
})
export class ProductosPage implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductsService) { }

  async ngOnInit() {
    this.products =
      await this.productService.getProducts();

  }

}