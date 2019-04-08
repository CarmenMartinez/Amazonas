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
  @Input() prodInCart: boolean;
  @Output() addOrRemoveItem = new EventEmitter();
  @Output() showItemDetail = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addOrRemove() {
    this.addOrRemoveItem.emit(this.producto);
  }

  showDetail() {
    this.showItemDetail.emit(this.producto);
  }

}
