import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductosService } from '../productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../Producto';

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent implements OnInit {
  productos: Producto[];
  carrito: Producto[];
  isCart: boolean;
  cantidad: number;
  total: number;

  private subscript: Subscription;

  constructor(private productService: ProductosService,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {

    if (this.router.url === '/productos') {
      this.isCart = false;
      this.productos = this.productService.getProducts();
    } else {
      this.isCart = true;
      this.productos = this.productService.getCart();
    }

    this.subscript = this.productService.cambiaDato
      .subscribe(
        (arregloProductos: Producto[]) => {
           this.productos = arregloProductos;
        }
      );
  }

  addProductToCart(product) {
    //Delete
    if (typeof product === 'number') {
      console.log(product);
      this.productService.removeFromCart(product);
      //this.getTotal();
    } else {
      this.cantidad ++;
      this.carrito.push(product);
    }

  }
  pushCart() {
    this.productService.addToCart(this.carrito);
  }

  showDetailList(producto: Producto) {
    this.router.navigate([producto.id], {relativeTo: this.route});
  }

}
