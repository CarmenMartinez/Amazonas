import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosListaComponent } from './productos/productos-lista/productos-lista.component';
import { ProductoDetalleComponent } from './productos/producto-detalle/producto-detalle.component';

/*
En la tarea existen las siguientes rutas:
1. servidor/home muestra el home
2. servidor/productos
  a. servidor/productos lista de artículos y permite añadir al carrito de compra
  b. servidor/productos/id muestra el detalle
3. servidor/carrito
  a. servidor/carrito muestra la lista de productos seleccionados al carrito
  b. servidor/carrito/id muestra el detalle del artículo (todos los campos)
*/
const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path: 'productos', component: ProductosComponent, children: [
    {path: '', component: ProductosListaComponent},
    {path: ':id', component: ProductoDetalleComponent},

  ]},
  {path: 'carrito', component: ProductosComponent, children: [
    {path: '', component: ProductosListaComponent},
    {path: ':id', component: ProductoDetalleComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
