import { Component, OnInit } from '@angular/core';
import { Libro } from '../../../interfaces/libro.interface';
import { HomeService } from '../../services/home.service';
import { CarritoService } from '../../services/carrito.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styles: [
  ]
})
export class LibrosComponent implements OnInit {

  libros: Libro[] = [];
  page: number = 0;

  constructor(
    private homeService: HomeService,
    private carritoService: CarritoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.homeService.getLibros()
      .subscribe(libroPage => {
        this.libros = libroPage.content;
        this.page = libroPage.number;
      })
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

  cargarMasLibros() {
    this.page += 1;

    this.homeService.getLibros(this.page)
      .subscribe(libroPage => {
        this.libros.push(...libroPage.content);
        this.page = libroPage.number;
      })
  }

}
