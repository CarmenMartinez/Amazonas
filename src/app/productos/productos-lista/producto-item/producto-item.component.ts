import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../Producto';


@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css']
})
export class ProductoItemComponent implements OnInit {
  @Input() producto: Producto;
  @Input() isCart: boolean;
  @Output() add = new EventEmitter();
  @Output() showItemDetail = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addItem() {
    this.add.emit(this.producto);
  }

  deleteItem() {
    this.add.emit(this.producto.id);
  }

  showDetail() {
    this.showItemDetail.emit(this.producto);
  }

}
