import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { CarritoService } from '../../services/carrito.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Libro } from '../../../interfaces/libro.interface';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styles: [
  ]
})
export class LibroComponent implements OnInit {

  libro!: Libro;

  constructor(
    private homeService: HomeService,
    private carritoService: CarritoService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;

    this.homeService.getLibro(slug)
      .subscribe(libro => this.libro = libro);
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
