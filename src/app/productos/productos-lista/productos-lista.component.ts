import { Component, OnInit } from '@angular/core';
import { ProductosComponent } from '../productos.component';
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

  private subscript: Subscription;

  constructor(private alumnosService: ProductosService,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.productos = this.alumnosService.getProducts();

    this.subscript = this.alumnosService.cambiaDato
      .subscribe(
        (arregloProductos: Producto[]) => {
           this.productos = arregloProductos;
        }
      );

  }

}
