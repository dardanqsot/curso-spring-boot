import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Libro } from '../../../interfaces/libro.interface';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styles: [
  ]
})
export class CarritoComponent implements OnInit {

  constructor(
    private carritoService: CarritoService,
    private homeService: HomeService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get items() {
    return this.carritoService.items;
  }

  get total() {
    return this.carritoService.items.map(item => item.precio).reduce((a, b) => a + b, 0);
  }

  removerItem(libro: Libro) {
    this.carritoService.removerItem(libro);
  }

  pagar() {
    const ok = confirm('¿Estás seguro de realizar esta compra?');

    if (ok) {
      const idLibros = this.carritoService.items.map(item => item.id);

      this.homeService.pagar(idLibros)
        .subscribe(venta => {
          this.carritoService.removerItems();
          this.router.navigate(['/detalles-compra', venta.id]);
        })
    }
  }

}
