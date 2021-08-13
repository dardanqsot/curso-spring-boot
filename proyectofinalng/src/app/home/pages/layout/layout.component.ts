import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: []
})
export class LayoutComponent implements OnInit {

  constructor(
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
  }

  get items() {
    return this.carritoService.items;
  }

}
