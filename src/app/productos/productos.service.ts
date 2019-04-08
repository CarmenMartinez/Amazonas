import { Injectable } from '@angular/core';
import { Producto } from './Producto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  lastId = 1;
  cambiaDato = new Subject<Producto[]>();
  productos: Producto[] = [
    new Producto(this.lastId ++, 'Producto1', 'patito1', 'laptop1', 20001, 101),
    new Producto(this.lastId ++, 'Producto2', 'patito2', 'laptop2', 20002, 102),
    new Producto(this.lastId ++, 'Producto3', 'patito3', 'laptop3', 20003, 103),
    new Producto(this.lastId ++, 'Producto4', 'patito4', 'laptop4', 20004, 104),
    new Producto(this.lastId ++, 'Producto5', 'patito5', 'laptop5', 20005, 105),
    new Producto(this.lastId ++, 'Producto6', 'patito6', 'laptop6', 20006, 106),
  ];

  carrito: Producto[] = [];
  constructor() { }


  getProducts(): Producto[] {
    return this.productos.slice();
  }

  getProduct(id: number): Producto {
    const pos = this.productos.findIndex(pr => pr.id === id);
    return Object.assign({}, this.productos[pos]);
  }

  getCart() {
    return this.carrito.slice();
  }

  addToCart(producto: Producto, isCart: boolean) {
    const prodAux = this.carrito.find(p => p.nombre.toUpperCase() === producto.nombre.toUpperCase());
    if (prodAux) { // existe producto en el carrito
      this.removeFromCart(Number(prodAux.id), isCart);
      console.log('remove' + this.carrito);
    } else {
      this.carrito.push(Object.assign({}, producto)); // creamos una copia
      console.log(this.carrito);
    }
  }

  notificarCambiosC() {
    this.cambiaDato.next(this.carrito.slice());
  }

  removeFromCart(id: number, isCart: boolean): boolean {
    console.log('r' + this.carrito);
    const pos = this.carrito.findIndex(prod => prod.id === id);
    if (pos >= 0) {
      this.carrito.splice(pos, 1);
      if (isCart) {
        this.notificarCambiosC();
      }
      return true;
    }
    return false;
  }
}
