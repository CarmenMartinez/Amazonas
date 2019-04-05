import { Injectable } from '@angular/core';
import { Producto } from './Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  lastId = 1;
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
    return this.carrito;
  }

  addToCart(producto: Producto): boolean {
    const prod = this.productos.find(p => p.nombre.toUpperCase() === producto.nombre.toUpperCase());
    if (prod) { // existe producto en el carrito
      return false;
    }
    this.carrito.push(Object.assign({}, producto)); // creamos una copia
    // this.notificarCambios();
    return true;
  }

  // notificarCambios() {
  //   this.cambiaDato.next(this.productos.slice());
  // }

  removeFromCart(id: number): boolean {
    const pos = this.carrito.findIndex(producto => producto.id === id);
    if (pos >= 0) {
      this.carrito.splice(pos, 1);
      return true;
    }
    delete this.productos[id];
  }
}
