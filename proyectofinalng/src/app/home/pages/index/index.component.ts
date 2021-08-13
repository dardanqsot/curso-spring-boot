import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Libro } from '../../../interfaces/libro.interface';
import { CarritoService } from '../../services/carrito.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: []
})
export class IndexComponent implements OnInit {

  ultimosLibros: Libro[] = [];

  constructor(
    private homeService: HomeService,
    private carritoService: CarritoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.homeService.getUltimosLibros()
      .subscribe(libros => this.ultimosLibros = libros);
  }

  agregarACarrito(libro: Libro) {
    this.carritoService.agregarItem(libro);
    this.snackBar.open('Ítem agregado', 'Cerrar', {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  libroYaEstaAgregado(libro: Libro) {
    return this.carritoService.itemYaExiste(libro);
  }

}
