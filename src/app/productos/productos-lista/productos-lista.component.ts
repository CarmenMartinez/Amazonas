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
    } else {
      this.isCart = true;
      console.log('carrito');
      this.productos = this.productService.getCart();
      this.titulo = 'Carrito de Compras';
    }

    console.log('init' + this.productos);

    this.subscript = this.productService.cambiaDato
      .subscribe(
        (arregloProductos: Producto[]) => {
           this.productos = arregloProductos;
        }
      );
  }

  changeCart(producto: Producto) {
    // if (typeof producto === 'number') {
    //console.log(producto);
    //   this.productService.removeFromCart(producto);
    //   //this.getTotal();
    // } else {
    //this.carrito.push(producto);
    this.productService.addToCart(producto);
      //this.productService.addToCart(this.carrito);
    //}

  }
  // pushCart() {
  //   this.productService.addToCart(this.carrito);
  // }

  showDetailList(producto: Producto) {
    this.router.navigate([producto.id], {relativeTo: this.route});
  }

}
