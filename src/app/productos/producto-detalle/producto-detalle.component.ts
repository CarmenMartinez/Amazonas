import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../Producto';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
    id: number;
    producto: Producto;

    constructor(private productService: ProductosService,
                private router: Router,
                private route: ActivatedRoute) { }
    ngOnInit() {
      this.route.params
        .subscribe(
          (params) => {
            this.id = params['id'];
          }
        )
    }
    regresar() {
      this.router.navigate(['/productos']);
    }
}
