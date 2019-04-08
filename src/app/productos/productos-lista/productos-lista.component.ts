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
  carrito: Producto[] = [];
  isCart: boolean;
  cantidad: number;
  prodInCart: boolean[] = [];
  titulo: string;
  total: number;

  private subscript: Subscription;

  constructor(private productService: ProductosService,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {

    if (this.router.url === '/productos') {
      this.isCart = false;
      this.productos = this.productService.getProducts();
      this.titulo = 'Lista de Productos';
      this.productsInCart();
      this.getQty();
    } else {
      this.isCart = true;
      this.productos = this.productService.getCart();
      this.titulo = 'Carrito de Compras';
      this.getTotal();
    }
    this.subscript = this.productService.cambiaDato
      .subscribe(
        (arregloProductos: Producto[]) => {
           this.productos = arregloProductos;
        }
      );
  }

  changeCart(producto: Producto) {
    this.productService.addToCart(producto, this.isCart);
    this.getTotal();
    this.getQty();
  }

  getQty() {
    this.carrito = this.productService.getCart();
    this.cantidad = this.carrito.length;
  }

  getTotal() {
    this.total = 0;
    this.productos.forEach(p => {
      this.total += p.precio;
    });
  }

  productsInCart() {
    this.carrito = this.productService.getCart();
    this.carrito.forEach(prodC => {
      if (this.productos.find(p => p.nombre.toUpperCase() === prodC.nombre.toUpperCase())) {
        this.prodInCart[prodC.id] = true;
      }
    });
  }

  showDetailList(producto: Producto) {
    this.router.navigate([producto.id], {relativeTo: this.route});
  }

}
